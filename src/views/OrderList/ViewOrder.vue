<template>
  <div class="w-full">
    <div class="w-full flex flex-col md:flex-row items-center justify-between">
      <div class="flex flex-wrap items-center">
        <span
          @click="$router.push({ name: 'order-list' })"
          class="text-[12px] md:text-[28px] font-bold block text-gray-700 hv-t"
        >
          Danh sách đơn hàng
        </span>
        <v-icon scale="1.5" name="md-keyboardarrowright" />
        <span
          @click="
            $router.push({
              name: `order-detail-list`,
              params: { id: item?.id },
            })
          "
          class="text-[12px] md:text-[28px] font-bold block text-gray-700 hv-t"
        >
          Đơn hàng
        </span>
        <v-icon scale="1.5" name="md-keyboardarrowright" />
        <span
          class="text-[12px] md:text-[28px] font-bold block text-gray-700 hv-t"
        >
          Chi tiết đơn hàng
        </span>
      </div>

      <button @click="createPayment" class="w-[200px] btn-primary px-2 py-1">
        Thanh toán
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
            <tr
              v-for="(item, index) in data?.returnOrderDetailViews"
              :key="index"
            >
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
                  <span class="mr-3 prevent-select">
                    {{ item?.children?.fullName || item?.childrenName }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="w-[90%] mx-auto flex items-start justify-between flex-col lg:flex-row mt-10"
    >
      <div class="w-full lg:w-[40%]">
        <div class="font-bold text-[18px] flex flex-wrap items-start flex-col">
          <span>
            Ngày đặt hàng:
            {{ convertDateOldVer(data?.creationDate) }}
          </span>
          <span
            ><span class="font-bold">Loại thanh toán:</span>
            {{ data?.eWalletMethod }}</span
          >
        </div>
      </div>
      <div class="w-full md:w-[58%] lg:w-[40%]">
        <div class="w-full flex flex-col items-end">
          <div
            class="w-full flex items-start flex-col mb-2"
            v-for="item in data?.paymentInformation"
          >
            <div class="w-full flex items-center justify-between">
              <span class="font-bold">Khoá học</span>
              <span>{{ item.courseCode }}</span>
            </div>
            <div class="w-full flex items-center justify-between">
              <span class="font-bold">Thời gian trả góp</span>
              <span>{{ item.month }}</span>
            </div>
            <div class="w-full flex items-center justify-between">
              <span class="font-bold">Tiền mỗi tháng</span>
              <span>{{ convertVND(item.amountPerMonth) }}</span>
            </div>
          </div>
        </div>
        <div class="w-full flex items-center justify-between mt-5">
          <span class="font-bold text-[20px] text-primary">Tổng tiền: </span>
          <span class="font-bold text-[20px]">{{
            convertVND(data?.total)
          }}</span>
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
      termNumber: 3,
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
  },
  methods: {
    getOrderDetail() {
      this.systemStore.setChangeLoading(true);
      API_ORDER.getOrderDetailByOrderIdAftterUpdate(this.$route.params.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.data = res.data;
          if (res.data.returnOrderDetailViews[0]?.payType != null) {
            this.payType =
              res.data?.returnOrderDetailViews[0]?.payType == "Cash" ? 1 : 2;
            this.isUpdateInfoOrder = true;
          }
          if (res.data.returnOrderDetailViews[0]?.installmentTerm != null)
            this.termNumber =
              res.data?.returnOrderDetailViews[0]?.installmentTerm;
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
    createPayment() {
      this.systemStore.setChangeLoading(true);

      API_ORDER.postPayment(this.$route.params.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          // window.open(res.data, "_self");
          this.$router.push({ name: "classes" });
        })
        .catch((err) => {
          swal.info(err.response.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    convertDate(date) {
      return func.convertDate(date);
    },
    convertDateOldVer(date) {
      return func.convertDateOldVer(date);
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
