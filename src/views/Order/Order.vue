<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700">Đơn hàng</span>

    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="data"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        excel="order-data"
        csv="order-data"
        :reload="true"
        @reload-action="reloadList"
        @update-action="updateOrder"
        @delete-action="deleteOrder"
      />
    </div>
  </div>
</template>
<script>
import { useSystemStore } from "../../stores/System";
import { useAuthStore } from "../../stores/Auth";
import func from "../../common/func";
import tableConfig from "../../common/config/tableConfig";
import NormalTable from "../../components/NormalTable.vue";
import swal from "../../common/swal";
export default {
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  components: {
    NormalTable,
  },
  data() {
    return {
      data: [],
      header: tableConfig.orderTable(),
    };
  },
  created() {
    this.convertValidData();
  },
  methods: {
    convertValidData() {
      // if (this.systemStore.getCourseData.length == 0) {
      //   swal.error(
      //     "Có lỗi xảy ra, vui lòng chọn lại các khoá học để thanh toán"
      //   );
      //   this.$router.push({ name: "courses", params: {} });
      // }

      if (this.systemStore.getCourseData.length == 0) {
      } else {
        let tmpArr = [];
        const today = new Date().toLocaleDateString();
        this.systemStore.getCourseData.map((item) => {
          tmpArr.push({
            orderId: "09782038023523407234",
            userAccountName: this.authStore.getAuth?.username,
            totalPrice: this.convertVND(item?.price),
            orderDate: today,
            statusPayment: "unPaid",
          });
          return item;
        });
        this.data = tmpArr;
      }
    },
    convertVND(price) {
      return func.convertVND(price);
    },
    reloadList(item) {},
    updateOrder(item) {},
    deleteOrder(item) {},
  },
};
</script>
<style scoped></style>
