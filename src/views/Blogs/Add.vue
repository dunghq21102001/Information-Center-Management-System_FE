<template>
  <div class="w-full">
    <div class="w-[95%] mx-auto mt-5">
      <select v-model="currentTab" class="px-3 py-1 w-[200px] select-primary">
        <option v-for="t in tabs" :value="t">
          {{ t }}
        </option>
      </select>
    </div>
    <FormSchema
      v-if="currentTab == 'Blog'"
      :schema="schema"
      page-title="Tạo bài viết"
      btn-name="Tạo"
      @form-submitted="handleAddPost"
    />
    <FormSchema
      v-else
      page-title="Tạo nhãn"
      :schema="tagSchema"
      btn-name="Tạo"
      @form-submitted="handleAddTag"
    />
  </div>
</template>
<script>
import { useSystemStore } from "../../stores/System";
import { useAuthStore } from "../../stores/Auth.js";
import schemaConfig from "../../common/config/schemaConfig";
import swal from "../../common/swal";
import FormSchema from "../../components/FormSchema.vue";
import API_TAG from "../../API/API_TAG";
import API_BLOG from "../../API/API_BLOG";
import { storage } from "../../common/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default {
  components: {
    FormSchema,
  },
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  data() {
    return {
      tabs: ["Blog", "Tag"],
      currentTab: "Blog",
      schema: [],
      tagSchema: schemaConfig.tagSchema(),
      isFetch: false,
    };
  },
  created() {
    this.fetchTags();
  },
  methods: {
    async handleAddPost(data) {
      this.systemStore.setChangeLoading(true);
      data["userId"] = this.authStore.getAuth?.id;
      let fData = [];
      data["tags"].map((item) => {
        fData.push(item.id);
      });
      data["tagIds"] = fData;
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
            API_BLOG.postBlog(data)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success("New blog created successfully!");
                this.$router.push({ name: "blogs" });
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
    },
    handleAddTag(data) {
      this.systemStore.setChangeLoading(true);
      API_TAG.postTag(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.$router.push({ name: "blogs" });
        })
        .catch((err) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchTags() {
      this.systemStore.setChangeLoading(true);
      API_TAG.getTags()
        .then((res) => {
          this.schema = schemaConfig.blogSchema(res.data);
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
  },
};
</script>
<style scoped></style>
