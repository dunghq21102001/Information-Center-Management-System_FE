<template>
  <div class="w-full">
    <FormSchema
      v-if="fetchCount == 3"
      :schema="userSchema"
      btn-name="Tạo"
      @form-submitted="handleAddUser"
      page-title="Tạo tài khoản"
      :is-hide-add-btn="isHiddenBtn"
    />
    <FormSchema
      v-if="fetchCount == 3 && isShowContract == true"
      :schema="contractSchema"
      btn-name="Tạo"
      @form-submitted="handleAddContract"
      page-title="Tạo hợp đồng"
    />
  </div>
</template>
<script>
import FormSchema from "../../components/FormSchema.vue";
import schemaConfig from "../../common/config/schemaConfig";
import API_ROLE from "../../API/API_ROLE";
import { useSystemStore } from "../../stores/System";
import API_USER from "../../API/API_USER";
import API_CONTRACT from "../../API/API_CONTRACT";
import swal from "../../common/swal";
import { useAuthStore } from "../../stores/Auth";
import { storage } from "../../common/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import API_LOCATION from "../../API/API_LOCATION";
export default {
  props: {},
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  components: { FormSchema },
  data() {
    return {
      userSchema: [],
      rolesFetched: false,
      contractSchema: [],
      fetchCount: 0,
      isShowContract: false,
      isHiddenBtn: false,
      locations: [],
      roles: [],
      jobType: [],
    };
  },
  watch: {
    fetchCount() {
      if (this.fetchCount == 3) {
        if (this.authStore.getAuth?.roleName == "Staff") {
          this.userSchema = schemaConfig.userSchema(
            ["Nam", "Nữ"],
            [
              {
                id: "d5fa55c7-315d-4634-9c73-08dbbc3f3a54",
                name: "Parent",
              },
            ],
            this.jobType,
            this.locations
          );
        } else {
          this.userSchema = schemaConfig.userSchema(
            ["Nam", "Nữ"],
            this.roles,
            this.jobType,
            this.locations
          );
        }
      }
    },
  },
  created() {
    this.fetchRoles();
    this.fetchLocations()
    this.fetchConfigJobType();
  },
  methods: {
    async handleAddUser(data) {
      this.systemStore.setChangeLoading(true);
      data["passwordHash"] = "User@123";
      try {
        const currentTime = new Date();
        const uniqueFileName = "image_" + currentTime.getTime();
        const storageRef = ref(
          storage,
          "avatars/" + data?.userName + uniqueFileName
        );

        // Chuyển đổi URL blob thành Blob
        const response = await fetch(data.avatar);
        const blob = await response.blob();

        // Tải lên ảnh avatar lên Firestore
        uploadBytes(storageRef, blob)
          .then((snapshot) => {
            return getDownloadURL(snapshot.ref);
          })
          .then(async (downloadURL) => {
            data.avatar = downloadURL;

            const currentTime2 = new Date();
            const uniqueFileName2 = "file_" + currentTime2.getTime();
            const storageRef2 = ref(
              storage,
              "contract/" + uniqueFileName2 + ".pdf"
            );
            const responseSyllabus = await fetch(data.fileTmp);
            const arrayBuffer = await responseSyllabus.arrayBuffer();
            const fileBlob = new Blob([arrayBuffer], {
              type: "application/pdf",
            });

            uploadBytes(storageRef2, fileBlob)
              .then((snapshot) => getDownloadURL(snapshot.ref))
              .then((downloadURL) => {
                const finalUrlFile = downloadURL;
                API_USER.postUser({
                  userName: data?.userName,
                  passwordHash: "User@123",
                  fullName: data?.fullName,
                  genderType: data?.genderType,
                  email: data?.email,
                  phone: data?.phone,
                  address: data?.address,
                  dateOfBirth: data?.dateOfBirth,
                  avatar: data?.avatar,
                  roleId: data?.roleId,
                  locationId: data?.locationId,
                  createContractViewModel:
                    data?.roleId == "d5fa55c7-315d-4634-9c73-08dbbc3f3a53"
                      ? {
                          configJobTypeId: data?.configJobTypeIdTmp,
                          contractCode: data?.contractCodeTmp,
                          startDate: data?.startDateTmp,
                          endDate: data?.endDateTmp,
                          job: data?.jobTmp,
                          file: finalUrlFile,
                          statusOfContract: 1,
                        }
                      : null,
                })
                  .then((res) => {
                    this.systemStore.setChangeLoading(false);
                    swal.success("Tạo mới người dùng thành công!");
                    this.$router.push({ name: "users" });
                  })
                  .catch((err) => {
                    swal.error(err.response?.data);
                    this.systemStore.setChangeLoading(false);
                  });
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
    fetchConfigJobType() {
      this.systemStore.setChangeLoading(true);
      API_CONTRACT.getConfigType().then((res) => {
        this.fetchCount++;
        this.jobType = res.data;
      });
    },
    handleChangeSelect(e) {
      if (e == "d5fa55c7-315d-4634-9c73-08dbbc3f3a53") {
        this.isShowContract = true;
        this.isHiddenBtn = true;
      } else {
        this.isShowContract = false;
        this.isHiddenBtn = false;
      }
    },
    fetchLocations() {
      this.systemStore.setChangeLoading(true)
      API_LOCATION.getLocations()
      .then(res => {
        this.systemStore.setChangeLoading(false)
        this.locations = res.data
        this.fetchCount++
      })
      .catch(er => {this.systemStore.setChangeLoading(false)})
    },
    fetchRoles() {
      // if (this.authStore.getAuth?.roleName == "Staff") {
      //   this.fetchCount++;
      //   this.rolesFetched = true;
      //   this.userSchema = schemaConfig.userSchema(
      //     ["Nam", "Nữ"],
      //     [
      //       {
      //         id: "d5fa55c7-315d-4634-9c73-08dbbc3f3a54",
      //         name: "Parent",
      //       },
      //     ]
      //   );
      // } else {
      this.systemStore.setChangeLoading(true);
      API_ROLE.getRoles()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          // this.rolesFetched = true;
          this.fetchCount++;
          this.roles = res.data;
          // this.userSchema = schemaConfig.userSchema(["Nam", "Nữ"], res.data);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
      // }
    },
  },
};
</script>
