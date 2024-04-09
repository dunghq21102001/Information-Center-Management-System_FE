<template>
  <div class="w-full">
    <div class="w-full flex items-center justify-between">
      <div class="w-full flex flex-wrap items-center">
        <span
          @click="$router.push({ name: 'order-list' })"
          class="text-[28px] font-bold block text-gray-700 hv-t"
        >
          Danh sách đơn hàng
        </span>
        <v-icon scale="1.5" name="md-keyboardarrowright" />
        <span class="text-[28px] font-bold block text-gray-700 hv-t">
          Đơn hàng
        </span>
      </div>
      <button
        v-if="isUpdateInfoOrder == false"
        class="btn-primary px-3 py-1 mr-12 w-[250px]"
        @click="handleUpdateInforOrder"
      >
        Cập nhật đơn hàng
      </button>
      <button
        v-if="isUpdateInfoOrder == true"
        class="btn-primary px-3 py-1 mr-12 w-[250px]"
        @click="handlePayment"
      >
        Chi tiết đơn hàng
      </button>
    </div>

    <div class="w-[90%] mx-auto mt-5">
      <div class="overflow-x-auto bsd">
        <table class="table-auto min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Mã khoá học
              </th>
              <!-- <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Số lượng
              </th> -->
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Giá
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phương thức thanh toán
              </th>
              <th
                v-show="payType == 2"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kỳ hạn
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Người học
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in data" :key="index">
              <td class="px-4 py-2 max-w-[300px]">
                {{ item?.courseName || item?.courseCode }}
              </td>
              <!-- <td class="px-4 py-2 max-w-[300px]">1</td> -->
              <td class="px-4 py-2 max-w-[300px]">
                {{ convertVND(item?.unitPrice) }}
              </td>
              <td class="px-4 py-2 max-w-[300px]">
                <select
                  :disabled="isUpdateInfoOrder == true"
                  class="select-primary px-8 py-1"
                  name=""
                  id=""
                  v-model="payType"
                >
                  <option v-for="t in enum" :value="t?.value">
                    {{ t?.display == "Cash" ? "Tiền mặt" : "Chuyển khoản" }}
                  </option>
                </select>
              </td>
              <td v-show="payType == 2" class="px-4 py-2 max-w-[300px]">
                <select
                  :disabled="isUpdateInfoOrder == true"
                  class="select-primary px-2 py-1"
                  name=""
                  id=""
                  v-model="termNumber"
                >
                  <option :value="0">0 tháng</option>
                  <option :value="3">3 tháng</option>
                  <option :value="6">6 tháng</option>
                </select>
              </td>
              <td class="px-4 py-2 max-w-[300px]">
                <div class="w-full flex items-center justify-between">
                  <span
                    @dblclick="handleDeleteChildrenInCourse(item)"
                    v-tooltip="'Nhấp 2 lần để xoá trẻ ra khỏi khoá học này'"
                    class="mr-3 cursor-pointer prevent-select"
                    >{{ item?.children?.fullName || item?.childrenName }}</span
                  >
                  <v-icon
                    @click="selectChildrenToAssign(item)"
                    name="bi-plus-circle"
                    class="cursor-pointer"
                    v-tooltip="'Chọn trẻ học khoá này'"
                    :scale="1.5"
                    fill="#0871ba"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- <div class="w-[90%] mx-auto flex items-start justify-end mt-5">
      <div class="flex flex-col w-full md:w-[40%] lg:w-[30%]">
        <div class="mb-4" v-for="(item, index) in dataAfterUpdate" :key="index">
          <div class="w-full flex items-center justify-between">
            <span class="font-bold">Khoá học:</span>
            <span class="block">
              {{ item?.courseCode }}
            </span>
          </div>
          <div class="w-full flex items-center justify-between">
            <span class="font-bold">Số tháng:</span>
            <span class="block">
              {{ item?.month }}
            </span>
          </div>
          <div class="w-full flex items-center justify-between">
            <span class="font-bold">Tổng tiền:</span>
            <span class="block">
              {{ convertVND(item?.totalAmount) }}
            </span>
          </div>
        </div>
      </div>
    </div> -->

    <div v-show="payType == 2" class="w-[90%] mx-auto mt-10">
      <div class="w-full md:w-[60%] lg:w-[40%]">
        <span class="text-[20px] text-gray-600"
          >Chọn phương thức thanh toán</span
        >
        <div class="w-full flex flex-col items-start">
          <div
            class="w-full flex items-center justify-between px-3 py-2 my-2"
            :class="selectType == 'VNPAY' ? 'br-active' : 'b-c'"
          >
            <label for="vnpay" class="w-[80%] flex items-center">
              <img class="w-[50px]" src="../../assets/images/vnpay_logo.png" />
              <span class="block ml-2">Ví VNPay</span>
            </label>
            <input
              value="VNPAY"
              v-model="selectType"
              id="vnpay"
              type="radio"
              class="w-[10%]"
              :disabled="isUpdateInfoOrder == true"
            />
          </div>
          <div
            class="w-full flex items-center justify-between px-3 py-2"
            :class="selectType == 'MOMO' ? 'br-active' : 'b-c'"
          >
            <label for="momo" class="w-[80%] flex items-center">
              <img class="w-[50px]" src="../../assets/images/MoMo_Logo.png" />
              <span class="block ml-2">Ví Momo</span>
            </label>
            <input
              value="MOMO"
              v-model="selectType"
              id="momo"
              type="radio"
              class="w-[10%]"
              :disabled="isUpdateInfoOrder == true"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- children list -->
    <div v-if="isShowChildrenList" class="bg-l" @click.self="cancelList">
      <div class="w-[90%] md:w-[60%] lg:w-[40%] bg-white min-h-screen px-3">
        <div class="w-full mt-5 py-5">
          <span class="text-[24px] font-bold text-gray-700 block"
            >Danh sách trẻ</span
          >
          <input
            type="text"
            placeholder="Tìm kiếm..."
            class="i-cus"
            v-model="searchValue"
            @input="handleSearch"
          />
          <div class="w-full overflow-y-scroll max-h-[75vh] hide-scrollbar">
            <div
              v-for="i in listChildren"
              class="flex items-center justify-between px-3 py-2 brb-cus"
            >
              <label :for="i?.name || i?.fullName" class="block">{{
                i?.name || i?.fullName
              }}</label>
              <input
                :id="i?.name || i?.fullName"
                type="checkbox"
                class="cb-cus"
                v-model="i.select"
              />
            </div>
          </div>
          <div class="w-full flex items-center justify-end">
            <button
              @click="saveAssignChildren"
              class="btn-primary mt-5 px-3 py-1 rounded-md"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useSystemStore } from "../../stores/System";
import { useAuthStore } from "../../stores/Auth";
import func from "../../common/func";
import swal from "../../common/swal";
import API_ORDER from "../../API/API_ORDER";
import API_USER from "../../API/API_USER";
import FormList from "../../components/FormList.vue";
export default {
  components: {
    FormList,
  },
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  components: {},
  data() {
    return {
      data: [],
      payType: 1,
      termNumber: 0,
      enum: [],
      isShowChildrenList: false,
      listChildren: [],
      selectedCourse: "",
      selectedChildInCourse: "",
      isUpdateInfoOrder: false,
      dataAfterUpdate: [],
      selectType: "VNPAY",

      // dành riêng cho form list
      dataBackup: [],
      searchValue: "",
    };
  },
  created() {
    this.getOrderDetail();
    this.fetchEnum();
    this.getListChildrenByStaff();
  },
  methods: {
    getOrderDetail() {
      this.systemStore.setChangeLoading(true);
      API_ORDER.getOrderDetailByOrderId(this.$route.params.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.data = res.data;
          if (res.data[0]?.payType != null) {
            this.payType = res.data[0]?.payType == "Cash" ? 1 : 2;
            this.isUpdateInfoOrder = true;
          }
          if (res.data[0]?.installmentTerm != null)
            this.termNumber = res.data[0]?.installmentTerm;

          if (res.data[0]?.eWalletMethod != null)
            this.selectType = res.data[0]?.eWalletMethod;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error("Đơn hàng không tồn tại!");
          this.$router.push({
            name: "order-list",
            params: {},
          });
        });
    },
    convertVND(price) {
      return func.convertVND(price);
    },
    convertToSelect() {
      let tmpArr = [];
      tmpArr = this.listChildren.map((item) => {
        item["select"] = false;
        return item;
      });
      this.listChildren = tmpArr;
      this.dataBackup = tmpArr;
    },
    handleDeleteChildrenInCourse(data) {
      if (this.isUpdateInfoOrder == true)
        return swal.error("Không thể cập nhật lại trẻ!");
      swal
        .confirm(
          `Bạn có chắc chắn muốn xoá ${data?.children?.fullName} ra khỏi khoá học ${data?.courseCode} này không?`
        )
        .then((result) => {
          if (result.value) {
            const courseCounts = {};
            this.data.forEach((item) => {
              if (courseCounts[item.courseCode]) {
                courseCounts[item.courseCode]++;
              } else {
                courseCounts[item.courseCode] = 1;
              }
            });

            let canDelete = true;
            for (const courseCode in courseCounts) {
              if (
                courseCounts[courseCode] === 1 &&
                data.courseCode === courseCode
              ) {
                swal.error(
                  `Không thể xoá ${data.courseCode} vì phải có ít nhất 1 người học khoá học này!`,
                  3000
                );
                canDelete = false;
                break;
              }
            }

            if (canDelete) {
              const index = this.data.findIndex((item) => item === data);
              if (index !== -1) {
                this.data.splice(index, 1);
              }
            }
          }
        });
    },
    fetchEnum() {
      this.systemStore.setChangeLoading(true);
      API_ORDER.enumOrderType()
        .then((res) => {
          this.enum = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    handlePayment() {
      this.$router.push({
        name: "view-order",
        params: { id: this.$route.params.id },
      });
      // this.systemStore.setChangeLoading(true);

      // API_ORDER.postPayment(this.$route.params.id)
      //   .then((res) => {
      //     this.systemStore.setChangeLoading(false);
      //     window.open(res.data, "_self");
      //   })
      //   .catch((err) => {
      //     this.systemStore.setChangeLoading(false);
      //   });
    },
    handleUpdateInforOrder() {
      let isInvalidData = false;

      this.data.map((item) => {
        if (!item?.children) isInvalidData = true;
      });

      if (isInvalidData)
        return swal.error(
          "Bạn phải chọn trẻ học các khoá học còn trống trong đơn hàng của bạn!",
          3000
        );

      let finalList = [];

      this.data.map((item) => {
        finalList.push({
          orderId: this.$route.params.id,
          courseId: item?.courseId,
          payType: this.payType,
          installmentTerm: this.termNumber,
          childrenProfildId: item?.children?.id,
          eWalletMethod: this.selectType,
        });
      });

      this.systemStore.setChangeLoading(true);
      API_ORDER.putOrderDetail(finalList)
        .then((res) => {
          swal.success(
            "Cập nhật chi tiết đơn hàng thành công! Tiến hành thanh toán để hoàn thành đơn hàng",
            3500
          );
          // this.dataAfterUpdate = res.data;
          this.systemStore.setChangeLoading(false);
          this.$router.push({
            name: "view-order",
            params: { id: this.$route.params.id },
          });
          // this.isUpdateInfoOrder = true;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err.response?.data);
          // swal.error("lỗi");
          // swal.success(
          //   "Cập nhật chi tiết đơn hàng thành công! Tiến hành thanh toán để hoàn thành đơn hàng",
          //   3500
          // );
          // this.$router.push({
          //   name: "view-order",
          //   params: { id: this.$route.params.id },
          // });
        });
    },
    getListChildrenByStaff() {
      if (this.authStore.getAuth?.roleName == "Staff") {
        this.systemStore.setChangeLoading(true);
        API_USER.getChildrenByStaff()
          .then((res) => {
            this.listChildren = res.data;
            this.dataBackup = res.data;
            this.systemStore.setChangeLoading(false);
            this.convertToSelect();
          })
          .catch((err) => this.systemStore.setChangeLoading(false));
      }
    },
    selectChildrenToAssign(item) {
      if (this.isUpdateInfoOrder == true)
        return swal.error("Không thể cập nhật lại trẻ!");
      this.selectedCourse = item?.courseId;
      if (item?.children) this.selectedChildInCourse = item?.children;
      this.isShowChildrenList = true;
      this.convertToSelect();
    },
    saveAssignChildren() {
      let dataSelected = [];
      this.listChildren.map((i) => {
        if (i?.select == true) dataSelected.push(i);
        return i;
      });

      if (dataSelected.length == 0)
        return swal.error(
          "Chọn ít nhất 1 đứa trẻ để thực hiện hành động này",
          2500
        );
      if (dataSelected.length == 1) {
        let existItem = this.data.find(
          (item) =>
            item?.courseId === this.selectedCourse &&
            item?.children?.id == dataSelected[0]?.id
        );
        if (!existItem) {
          this.data.forEach((item) => {
            if (item?.courseId === this.selectedCourse && !item?.children)
              item["children"] = dataSelected[0];
            else if (item?.courseId === this.selectedCourse && item?.children) {
              let isExistThisChildInTheRreDataAddition = this.data.find(
                (ite) => {
                  if (
                    ite?.courseId == this.selectedCourse &&
                    ite?.children?.id == dataSelected[0]?.id
                  )
                    return ite;
                }
              );
              if (
                !isExistThisChildInTheRreDataAddition &&
                item?.children?.id == this.selectedChildInCourse?.id
              )
                item["children"] = dataSelected[0];
              else {
                // console.log(
                //   "đã có hoặc chưa có nhưng chưa đúng child muốn thay thế"
                // );
              }
            }
          });
        }
      }

      if (dataSelected.length >= 2) {
        dataSelected.map((child) => {
          let existItem = this.data.find(
            (item) =>
              item?.courseId === this.selectedCourse &&
              item?.children?.id == child?.id
          );
          if (!existItem) {
            this.data.forEach((item) => {
              if (item?.courseId === this.selectedCourse && !item.children)
                item["children"] = child;
              else if (item?.courseId == this.selectedCourse && item.children) {
                if (item.children?.id != child?.id) {
                  let isExistThisChildInTheRreDataAddition = this.data.find(
                    (ite) => {
                      if (
                        ite?.courseId == this.selectedCourse &&
                        ite?.children?.id == child?.id
                      )
                        return ite;
                    }
                  );
                  if (!isExistThisChildInTheRreDataAddition) {
                    let newItem = { ...item };
                    newItem["children"] = child;
                    this.data.push(newItem);
                  }
                }
              }
            });
          } else {
            // console.log("đã có children tên: " + existItem?.children?.fullName);
          }
        });
      }

      this.isShowChildrenList = false;
    },
    cancelList() {
      this.selectedCourse = "";
      this.isShowChildrenList = false;
      this.convertToSelect();
    },
    handleSearch() {
      if (this.searchValue.trim() !== "") {
        this.listChildren = this.dataBackup.filter((item) => {
          if (item?.name) {
            return item.name
              .toLowerCase()
              .includes(this.searchValue.toLowerCase());
          }
          if (item?.fullName) {
            return item.fullName
              .toLowerCase()
              .includes(this.searchValue.toLowerCase());
          }
        });
      } else {
        this.listChildren = [...this.dataBackup];
      }
    },
  },
};
</script>
<style scoped>
td {
  vertical-align: top;
}

.bsd {
  box-shadow: 0 0px 5px 1px #cdcdcd;
  /* border: 1px solid rgb(207, 207, 207); */
}

.bg-l {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 60;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #f6f6f6;
}

::-webkit-scrollbar-thumb {
  background-color: #b1afaf;
}

::-webkit-scrollbar-button:start {
  display: none;
}

::-webkit-scrollbar-button:end {
  display: none;
}

.brb-cus {
  border-bottom: 1px solid #f5f5f5;
}

input.cb-cus {
  transform: scale(1.4);
}

.b-c {
  border: 1px solid rgb(213, 213, 213);
  border-radius: 10px;
}

.br-active {
  border: 1px solid rgb(68, 134, 244);
  border-radius: 10px;
}
</style>
