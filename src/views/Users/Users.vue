<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700">Người dùng</span>
    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="users"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        :is-reset-pass="true"
        is-add="user-create"
        :is-multi-select="true"
        :is-change-status="true"
        excel="user-data"
        csv="user-data"
        :reload="true"
        @reload-action="reloadList"
        @update-action="updateUser"
        @delete-action="deleteUser"
        @update-status="updateStatusAccount"
        @add-children-action="addChildren"
      />
    </div>
  </div>
</template>
<script>
import API_USER from "../../API/API_USER";
import tableConfig from "../../common/config/tableConfig";
import NormalTable from "../../components/NormalTable.vue";
import { useSystemStore } from "../../stores/System";
import { useAuthStore } from "../../stores/Auth";
import func from "../../common/func";
import swal from "../../common/swal";
import { storage } from "../../common/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default {
  components: {
    NormalTable,
  },
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  data() {
    return {
      header: tableConfig.userTable(),
      users: [],
    };
  },
  methods: {
    fetchUsers() {
      this.systemStore.setChangeLoading(true);
      // if (this.authStore.getAuth?.roleName == "Staff") {
      //   API_USER.userByRole("d5fa55c7-315d-4634-9c73-08dbbc3f3a54")
      //     .then((res) => {
      //       this.users = res.data;
      //       this.systemStore.setChangeLoading(false);
      //     })
      //     .catch((err) => {
      //       this.systemStore.setChangeLoading(false);
      //     });
      // } else {
        API_USER.users()
          .then((res) => {
            this.users = res.data;
            this.systemStore.setChangeLoading(false);
          })
          .catch((err) => {
            this.systemStore.setChangeLoading(false);
          });
      // }
    },
    async updateUser(data) {
      if (func.isBlobURL(data?.avatar)) {
        this.systemStore.setChangeLoading(true);
        try {
          const currentTime = new Date();
          const uniqueFileName = "image_" + currentTime.getTime();
          const storageRef = ref(storage, "avatars/" + uniqueFileName);

          // Chuyển đổi URL blob thành Blob
          const response = await fetch(data.avatar);
          const blob = await response.blob();

          // Tải lên ảnh avatar lên Firestore
          uploadBytes(storageRef, blob)
            .then((snapshot) => {
              return getDownloadURL(snapshot.ref);
            })
            .then((downloadURL) => {
              data.avatar = downloadURL;
              API_USER.putUser(data)
                .then((res) => {
                  this.systemStore.setChangeLoading(false);
                  swal.success(res.data);
                  this.fetchUsers();
                })
                .catch((err) => {
                  swal.error(err?.response?.data)
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
        API_USER.putUser(data)
          .then((res) => {
            this.systemStore.setChangeLoading(false);
            swal.success(res.data);
            this.fetchUsers();
          })
          .catch((err) => {
            swal.error(err?.response?.data)
            this.systemStore.setChangeLoading(false);
          });
      }
    },
    async addChildren(data) {
      this.systemStore.setChangeLoading(true);
      try {
        const currentTime = new Date();
        const uniqueFileName = "image_" + currentTime.getTime();
        const storageRef = ref(
          storage,
          "avatars/" + uniqueFileName
        );

        // Chuyển đổi URL blob thành Blob
        const response = await fetch(data.avatar);
        const blob = await response.blob();

        // Tải lên ảnh avatar lên Firestore
        uploadBytes(storageRef, blob)
          .then((snapshot) => {
            return getDownloadURL(snapshot.ref);
          })
          .then((downloadURL) => {
            data.avatar = downloadURL;
            API_USER.postChildren(data)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success("Tạo mới trẻ thành công");
                this.fetchUsers()
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
        console.error("Error uploading avatar:", error);
      }
    },
    deleteUser(item) {
      swal
        .confirm("Bạn có chắc chắn muốn xoá không?")
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            API_USER.deleteUser(item?.id)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success("Xoá thành công!");
                this.fetchUsers();
              })
              .catch((err) => {
                this.systemStore.setChangeLoading(false);
                swal.error(err.response?.data, 2500);
              });
          }
        });
    },
    updateStatusAccount(items) {
      let fData = [];
      items.map((i) => {
        fData.push(i?.id);
      });

      this.systemStore.setChangeLoading(true);
      API_USER.changeStatus(fData)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.fetchUsers();
        })
        .catch((err) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    reloadList(param) {
      this.fetchUsers();
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>
