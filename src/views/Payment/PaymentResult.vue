<template>
  <div class="w-full">
    <!-- <div class="w-[90%] mx-auto">
      <span
        :class="`block text-center text-[24px] my-3 ${
          resultStatus ? 'text-green-500' : 'text-red-500'
        }`"
      >
        {{
          resultStatus
            ? "Giao dịch thành công"
            : "Giao dịch không thành công do: Khách hàng hủy giao dịch."
        }}
      </span>

      <table class="w-full">
        <thead>
          <tr style="background-color: white">
            <th>Name</th>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Merchant ID</td>
            <td>CTTVNP01</td>
            <td>Được cấp bởi VNPAY</td>
          </tr>
          <tr>
            <td>Merchant Name</td>
            <td>VNPAY</td>
            <td>Tên Website Merchant</td>
          </tr>
          <tr>
            <td>Merchant Transaction Reference</td>
            <td>174296</td>
            <td>Mã GD của website merchant</td>
          </tr>
          <tr>
            <td>Transaction Info</td>
            <td>Thanh toan don hang thoi gian: 2024-02-09 10:39:57</td>
            <td>Thông tin mô tả từ website merchant</td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>{{ resultStatus ? "500.000VND" : "" }}</td>
            <td>Số tiền được thanh toán</td>
          </tr>
          <tr>
            <td>Current Code</td>
            <td>VND</td>
            <td>Đơn vị tiền tệ được thanh toán</td>
          </tr>
          <tr>
            <td>Transaction Response Code</td>
            <td>24</td>
            <td>Trạng thái GD</td>
          </tr>
          <tr>
            <td>Message</td>
            <td>
              {{
                resultStatus
                  ? "Giao dịch thành công."
                  : "Giao dịch không thành công do: Khách hàng hủy giao dịch."
              }}
            </td>
            <td>Thông báo từ cổng thanh toán</td>
          </tr>
          <tr>
            <td>Transaction Number</td>
            <td>0</td>
            <td>Mã GD trên cổng thanh toán</td>
          </tr>
          <tr>
            <td>Bank</td>
            <td>VNPAY</td>
            <td>Ngân hàng GD</td>
          </tr>
        </tbody>
      </table>
      <span
        class="block text-center text-[18px] hover:underline text-blue-500 cursor-pointer"
      >
        Go to transaction
      </span>
      <div class="line"></div>
      <span class="text-[18px] text-center block text-gray-400"> © VNPAY 2024</span>
    </div> -->

    <div class="w-full flex items-center justify-center mt-20">
      <v-icon
        v-if="message != 'Thanh toán thành công.'"
        name="ri-close-circle-line"
        fill="#f4493c"
        scale="3.5"
      />
      <v-icon
        v-else
        name="fa-regular-check-circle"
        fill="#28c37d"
        scale="3.5"
      />
    </div>
    <div class="w-full flex items-center justify-center">
      <span class="block mt-3 font-bold text-[20px] text-[#28c37d]">
        {{ message }}
      </span>
      <!-- <span class="block mt-3 font-bold text-[20px] text-[#f4493c]">Thanh toán thất bại</span> -->
    </div>
    <div class="w-full flex items-center justify-center mt-10">
      <p>
        <span class="text-[18px]">Mã đơn: </span>
        <span class="font-bold text-[18px]"> {{ orderNumber }} </span>
      </p>
      &nbsp; &nbsp; &nbsp;
      <p>
        <span class="text-[18px]">Tổng tiền: </span>
        <span class="font-bold text-[18px]"> {{ convertVND(amount) }} </span>
      </p>
    </div>
    <div class="w-full flex items-center justify-center mt-10">
      <p>
        <span class="text-[18px]">Kiểu thanh toán: </span>&nbsp;
        <span class="font-bold text-[18px]"> Online </span>
      </p>
    </div>
    <div class="w-full flex items-center justify-center mt-10">
      <button @click="backToWelcome" class="btn-primary px-3 py-1">
        Trở về trang chủ
      </button>
    </div>
  </div>
</template>
<script>
import func from "../../common/func";
import { useAuthStore } from "../../stores/Auth";
export default {
  components: {},
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  data() {
    return {
      message: "",
      orderNumber: "",
      amount: "",
    };
  },
  created() {
    const message = this.$route.query.message;
    const orderNumber = this.$route.query.orderNumber;
    const amount = this.$route.query.amount;
    // if (message != null && message != "")
    //   swal.success("Giao dịch thành công! Tiến hành thêm trẻ vào lớp", 3000);

    if (message) this.message = message;
    if (orderNumber) this.orderNumber = orderNumber;
    if (amount) this.amount = amount;
  },
  methods: {
    convertVND(price) {
      const num = Number.parseInt(price);
      return func.convertVND(num);
    },
    backToWelcome() {
      if (this.authStore == null)
        this.$router.push({ name: "welcome", params: {} });
      else this.$router.push({ name: "profile", params: {} });
    },
  },
};
</script>
<style scoped>
th,
td {
  border-top: 1px solid #dee2e6;
  padding: 10px 5px;
  text-align: left;
}

tr:nth-child(odd) {
  background-color: #f2f2f2;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #eaeaea;
  margin: 10px 0;
}
</style>
