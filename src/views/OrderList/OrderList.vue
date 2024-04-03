<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700">Danh sách đơn hàng</span>

    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="data"
        :header="header"
        :is-show-search="true"
        excel="order-data"
        csv="order-data"
        :reload="true"
        :isPayment="true"
        @reload-action="reloadList"
        @payment-action="handlePayment"
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
import API_ORDER from "../../API/API_ORDER";
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
      header: tableConfig.orderListTable(),
    };
  },
  created() {
    this.fetchOrder();
  },
  methods: {
    fetchOrder() {
      this.systemStore.setChangeLoading(true);
      API_ORDER.getOrders()
        .then((res) => {
          this.data = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    convertVND(price) {
      return func.convertVND(price);
    },
    reloadList(item) {
      this.fetchOrder();
    },
    handlePayment(item) {
      this.$router.push({
        name: "order-detail-list",
        params: { id: item?.id },
      });

      // this.systemStore.setChangeLoading(true);
      // API_ORDER.postPayment(item?.id)
      //   .then((res) => {
      //     this.systemStore.setChangeLoading(false);
      //     window.open(res.data, "_blank");
      //   })
      //   .catch((err) => {
      //     swal.error(err.response?.data);
      //     this.systemStore.setChangeLoading(false);
      //   });
    },
  },
};
</script>
<style scoped></style>
