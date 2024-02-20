<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto">
      <span class="text-[28px] font-bold block text-gray-700"
        >Training Programs</span
      >
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
        v-if="currentTab == 'Training Programs'"
        :data="data"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        :is-expand="true"
        :is-multi-select="true"
        excel="training-program-data"
        csv="training-program-data"
        :reload="true"
        :is-buy="true"
        is-add="training-program-create"
        @reload-action="reloadList"
        @show-form="checkShowForm"
        @update-action="updateTP"
        @delete-action="deleteTP"
        :tp-category-list="dataCate"
      />
      <NormalTable
        v-else
        :data="dataCate"
        :header="headerCate"
        :is-show-search="true"
        excel="training-program-category-data"
        csv="training-program-category-data"
        :reload="true"
        :is-update="true"
        :is-delete="true"
        :is-expand="true"
        @reload-action="reloadList"
        is-add="training-program-create"
        @update-action="updateCate"
        @delete-action="deleteCate"
      />
    </div>

    <div @click.self="isShowForm = false" class="fog" v-show="isShowForm">
      <div class="bg-white rounded-lg w-[95%] md:w-[80%] lg:w-[50%] p-4">
        <span class="block text-[20px] lg:text-[24px]">
          Select Discount Code
        </span>
        <select class="px-3 py-1 mt-3 w-[150px]">
          <option selected value="">none</option>
          <option value="">TET40</option>
          <option value="">TET50</option>
          <option value="">TET60</option>
          <option value="">NEW10000</option>
          <option value="">FULL500000</option>
        </select>

        <div class="w-full flex items-start justify-between flex-wrap">
          <div class="w-[50%]">
            <span class="block text-[20px] lg:text-[24px] mt-5">
              Select A Payment Method
            </span>
            <select class="px-3 py-1 mt-3 w-[150px]">
              <option value="">Cash</option>
              <option value="">Bank Transfer</option>
              <option value="">Electronic Wallet</option>
            </select>
          </div>

          <div class="w-[50%]">
            <span class="block text-[20px] lg:text-[24px] mt-5">
              Select A Payment Type
            </span>
            <select class="px-3 py-1 mt-3 w-[150px]">
              <option value="">Pay All</option>
              <option value="">Installment</option>
            </select>
          </div>
        </div>

        <div class="w-full flex items-center justify-start mt-5">
          <button @click="isShowForm = false" class="px-3 py-1 btn-cancel">
            Cancel
          </button>
          <button class="px-3 py-1 btn-primary ml-3" @click="payment">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API_TP from "../../API/API_TP";
import tableConfig from "../../common/config/tableConfig";
import swal from "../../common/swal";
import NormalTable from "../../components/NormalTable.vue";
import { useSystemStore } from "../../stores/system";
import { storage } from "../../common/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import func from "../../common/func";
export default {
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  components: { NormalTable },
  data() {
    return {
      header: tableConfig.trainingProgramTable(),
      headerCate: tableConfig.tpCategoryTable(),
      isShowForm: false,
      tabs: ["Training Programs", "Categories"],
      currentTab: "Training Programs",
      data: [],
      dataCate: [],
    };
  },
  created() {
    this.fetchTP();
    this.fetchTPCate();
  },
  methods: {
    fetchTP() {
      this.systemStore.setChangeLoading(true);
      API_TP.getTrainingPrograms()
        .then((res) => {
          this.data = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    fetchTPCate() {
      this.systemStore.setChangeLoading(true);
      API_TP.getTrainingProgramCategories()
        .then((res) => {
          this.dataCate = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    checkShowForm(isShowForm) {
      this.isShowForm = isShowForm;
    },
    updateCate(data) {
      this.systemStore.setChangeLoading(true);
      API_TP.putTrainingProgramCategory(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.fetchTPCate();
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error("Updated fail! Please try again");
        });
    },
    async updateTP(data) {
      if (func.isBlobURL(data?.image)) {
        this.systemStore.setChangeLoading(true);
        try {
          const currentTime = new Date();
          const uniqueFileName = "image_" + currentTime.getTime();
          const storageRef = ref(storage, "tp/" + uniqueFileName);

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
              API_TP.putTrainingProgram(data)
                .then((res) => {
                  this.systemStore.setChangeLoading(false);
                  swal.success(res.data);
                  this.fetchTP();
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
        API_TP.putTrainingProgram(data)
          .then((res) => {
            swal.success(res.data);
            this.systemStore.setChangeLoading(false);
            this.fetchTP();
          })
          .catch((err) => {
            this.systemStore.setChangeLoading(false);
            swal.error("Updated fail! Please try again");
          });
      }
    },
    deleteTP(item) {
      swal
        .confirm("Are you sure you want to delete this training program?")
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            API_TP.deleteTrainingProgram(item?.id)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success(res.data);
                this.fetchTP();
              })
              .catch((err) => {
                this.systemStore.setChangeLoading(false);
                swal.error("Delete failed! Please try again", 2500);
              });
          }
        });
    },
    deleteCate(item) {
      swal
        .confirm(
          "Are you sure you want to delete this training program category?"
        )
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            API_TP.deleteTrainingProgramCategory(item?.id)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success(res.data);
                this.fetchTPCate();
              })
              .catch((err) => {
                this.systemStore.setChangeLoading(false);
                swal.error("Delete failed! Please try again", 2500);
              });
          }
        });
    },
    changeTab(t) {
      this.currentTab = t;
    },
    payment() {
      window.open(
        "https://sandbox.vnpayment.vn/paymentv2/Transaction/PaymentMethod.html?token=3349400e691e4b4c8dd0b514cc9aaaa9",
        "_blank"
      );
    },
    reloadList() {
      this.fetchTP();
      this.fetchTPCate();
    },
  },
};
</script>
<style scoped>
.fog {
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 70;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
