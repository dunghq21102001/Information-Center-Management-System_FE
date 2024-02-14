<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto">
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
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  setup() {
    return {
      resultStatus: true,
    };
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
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
