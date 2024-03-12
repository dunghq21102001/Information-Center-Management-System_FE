<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto">
      <span class="text-[28px] font-bold block text-gray-700">Bài viết</span>
      <div
        class="w-full flex items-center mt-5 mx-auto justify-start text-[20px]"
      >
        <span
          @click="changeTab(t)"
          class="block px-3 py-1 rounded-lg cursor-pointer mr-3"
          v-for="t in tabs"
          :class="currentTab == t ? 'bg-gray-100' : ''"
        >
          {{ t }}
        </span>
      </div>

      <NormalTable
        v-if="currentTab == 'Blog'"
        :data="data"
        :header="header"
        :is-show-search="true"
        excel="blog-data"
        csv="blog-data"
        :reload="true"
        :is-update="true"
        :is-delete="true"
        @reload-action="reloadList"
        is-add="blog-create"
        @update-action="updateBlog"
        @delete-action="deleteBlog"
      />

      <NormalTable
        v-else
        :data="tagData"
        :header="tagHeader"
        :is-show-search="true"
        excel="tag-data"
        csv="tag-data"
        :reload="true"
        :is-update="true"
        :is-delete="true"
        @reload-action="reloadList"
        is-add="blog-create"
        @update-action="updateTag"
        @delete-action="deleteTag"
      />
    </div>

    <!-- <div
      @click.self="isShowAssign = false"
      v-show="isShowAssign"
      class="fog-blog"
    >
      <div class="bg-white rounded-md p-5 md:w-[70%] w-[90%]">
        <div
          @click="isShowList = !isShowList"
          v-click-outside-element="hiddenList"
          class="w-full mx-auto p-2 relative border-[1px] border-solid border-gray-400 rounded-md cursor-pointer flex items-start"
        >
          <div class="w-[100px] overflow-hidden">
            <img class="w-full object-cover" :src="selectedBlog?.image" />
          </div>
          <div class="w-[80%] pl-2">
            {{ selectedBlog?.title }}
          </div>

          <div
            class="absolute top-[100%] w-full max-h-[50vh] shadow-lg overflow-y-scroll p-2 bg-white"
            v-show="isShowList"
          >
            <div
              v-for="item in data"
              @click="selectedBlogAction(item)"
              class="mx-auto cursor-pointer py-1 flex items-start my-2 hover:bg-gray-200"
            >
              <div class="w-[100px] overflow-hidden">
                <img class="w-full object-cover" :src="item?.image" />
              </div>
              <div class="w-[80%] pl-2">
                {{ item?.title }}
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mx-auto flex justify-end items-center mt-3">
          <button @click="assignAction" class="btn-primary px-3 py-1">Assign</button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import NormalTable from "../../components/NormalTable.vue";
import { useAuthStore } from "../../stores/Auth";
import { useSystemStore } from "../../stores/system";
import tableConfig from "../../common/config/tableConfig";
import API_TAG from "../../API/API_TAG";
import API_BLOG from "../../API/API_BLOG";
import swal from "../../common/swal";
import { storage } from "../../common/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default {
  components: { NormalTable },
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  data() {
    return {
      tabs: ["Blog", "Tag"],
      currentTab: "Blog",
      header: tableConfig.blogTable(),
      tagHeader: tableConfig.tagTable(),
      selectedTags: [],
      selectedBlog: null,
      isShowAssign: false,
      isShowList: false,
      data: [],
      tagData: [],
    };
  },
  created() {
    this.reloadList();
  },
  methods: {
    changeTab(t) {
      this.currentTab = t;
    },
    fetchBlog() {
      this.systemStore.setChangeLoading(true);
      API_BLOG.getBlogs()
        .then((res) => {
          this.data = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    fetchTag() {
      this.systemStore.setChangeLoading(true);
      API_TAG.getTags()
        .then((res) => {
          this.tagData = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    selectedBlogAction(item) {
      this.selectedBlog = item;
    },
    assignToBlog(tags) {
      this.selectedTags = tags;
      this.isShowAssign = true;
      this.selectedBlog = this.data[0];
    },
    assignAction() {
      this.systemStore.setChangeLoading(true)
      API_BLOG.assignToBlog({
        blogId: this.selectedBlog?.id,
        tagId: this.selectedTags[0]?.id
      })
      .then(res => {
        swal.success(res.data)
        this.systemStore.setChangeLoading(false)
        this.isShowAssign = false
      })
      .catch(err => {
        swal.error('Gán nhãn vào blog thất bại! Vui lòng thử lại')
        this.systemStore.setChangeLoading(true)
      })
    },
    async updateBlog(data) {
      if (this.isBlobURL(data?.image)) {
        this.systemStore.setChangeLoading(true);
        data["userId"] = this.authStore.getAuth?.id;
        try {
          const currentTime = new Date();
          const uniqueFileName = "image_" + currentTime.getTime();
          const storageRef = ref(storage, "blogImage/" + uniqueFileName);

          // Chuyển đổi URL blob thành Blob
          const response = await fetch(data.image);
          const blob = await response.blob();

          // Tải lên ảnh avatar lên Firestore
          uploadBytes(storageRef, blob)
            .then((snapshot) => {
              return getDownloadURL(snapshot.ref);
            })
            .then((downloadURL) => {
              data.image = downloadURL;
              API_BLOG.putBlog(data)
                .then((res) => {
                  this.systemStore.setChangeLoading(false);
                  swal.success(res.data);
                  this.fetchBlog();
                })
                .catch((err) => {
                  this.systemStore.setChangeLoading(false);
                });
            })
            .catch((error) => {
              console.log("Lỗi khi tải ảnh lên:", error);
            });
        } catch (error) {
          this.systemStore.setChangeLoading(false);
          console.error("Error uploading:", error);
        }
      } else {
        this.systemStore.setChangeLoading(true);
        data["userId"] = this.authStore.getAuth?.id;
        API_BLOG.putBlog(data)
          .then((res) => {
            this.systemStore.setChangeLoading(false);
            swal.success(res.data);
            this.fetchBlog();
          })
          .catch((err) => {
            this.systemStore.setChangeLoading(false);
          });
      }
    },
    hiddenList() {
      this.isShowList = false;
    },
    isBlobURL(url) {
      return url.startsWith("blob:");
    },
    deleteBlog(item) {
      swal
        .confirm("Bạn có chắc chắn muốn xoá không?")
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            API_BLOG.deleteBlog(item?.id)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success("Xoá thành công");
                this.fetchBlog();
              })
              .catch((err) => {
                this.systemStore.setChangeLoading(false);
                swal.error("Xoá thất bại! Vui lòng thử lại", 2500);
              });
          }
        });
    },
    deleteTag(item) {
      swal
        .confirm("Bạn có chắc chắn muốn xoá không?")
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            API_TAG.deleteTag(item?.id)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success("Xoá thành công");
                this.fetchTag();
              })
              .catch((err) => {
                this.systemStore.setChangeLoading(false);
                swal.error("Xoá thất bại! Vui lòng thử lại", 2500);
              });
          }
        });
    },
    updateTag(data) {
      this.systemStore.setChangeLoading(true);
      API_TAG.putTag(data)
        .then((res) => {
          this.data = res.data;
          this.systemStore.setChangeLoading(false);
          this.fetchTag();
          swal.success(res.data);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error("Cập nhật thất bại! Vui lòng thử lại");
        });
    },
    reloadList() {
      this.fetchBlog();
      this.fetchTag();
    },
  },
};
</script>
<style scoped>
.fog-blog {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 60;
}
</style>
