<template>
  <div class="w-full">
    <p class="page-sub-title">Bảo mật</p>
    <div class="grid grid-cols-12 gap-3">
      <div class="col-span-12 flex flex-col items-start">
        <label for="curPass">Mật khẩu hiện tại</label>
        <input id="curPass" type="password" class="i-cus" v-model="curPass" />
      </div>
      <div class="col-span-12 flex flex-col items-start">
        <label for="newP">Mật khẩu mới</label>
        <input id="newP" type="password" class="i-cus" v-model="pass1" />
      </div>
      <div class="col-span-12 flex flex-col items-start">
        <label for="newPAgain">Nhập lại mật khẩu mới</label>
        <input id="newPAgain" type="password" class="i-cus" v-model="pass2" />
      </div>
    </div>
    <div class="w-full flex items-center justify-end mt-5">
      <button class="btn-primary px-3 py-1 rounded-lg" @click="changePass">
        Lưu
      </button>
    </div>

    <div class="w-full" v-if="authStore.getAuth?.roleName == 'Parent'">
      <p class="page-sub-title">Giao dịch</p>
      <div class="mt-5 w-full">
        <NormalTable
          :data="transactions"
          :header="header"
          :is-show-search="true"
          excel="transaction-data"
          csv="transaction-data"
          :reload="true"
          @reload-action="reloadList"
          @click-to-row="gotoDetail"
        />
      </div>
    </div>

    <div class="w-full" v-if="isShowDetail">
      <p class="page-sub-title">Chi tiết giao dịch</p>
      <p
        v-if="transactionDetail.length == 0"
        class="w-full text-center text-[22px] text-gray-600"
      >
        Không có kì hạn trả góp
      </p>
      <NormalTable
        v-else
        :data="transactionDetail"
        :header="headerDetail"
        :is-show-search="true"
        excel="transaction-detail-data"
        csv="transaction-detail-data"
      />
    </div>
  </div>
</template>
<script>
import API_USER from "../../API/API_USER";
import API_TRANSACTION from "../../API/API_TRANSACTION";
import swal from "../../common/swal";
import { useAuthStore } from "../../stores/Auth";
import { useSystemStore } from "../../stores/System";
import NormalTable from "../NormalTable.vue";
import tableConfig from "../../common/config/tableConfig";
export default {
  components: {
    NormalTable,
  },
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  props: {},
  data() {
    return {
      pass1: "",
      pass2: "",
      curPass: "",
      transactions: [],
      header: tableConfig.transactionTable(),
      headerDetail: tableConfig.transactionDetailTable(),
      isShowDetail: false,
      transactionDetail: [],
    };
  },
  created() {
    if (this.authStore.getAuth?.roleName == "Parent") this.fetchTransaction();
  },
  methods: {
    changePass() {
      if (this.pass1.trim() == this.pass2.trim()) {
        this.systemStore.setChangeLoading(true);
        API_USER.resetPassword({
          id: this.authStore.getAuth?.id,
          currentPassword: this.curPass,
          newPasswordHash: this.pass1,
        })
          .then((res) => {
            swal.success("Đổi mật khẩu thành công!");
            this.systemStore.setChangeLoading(false);
          })
          .catch((err) => {
            this.systemStore.setChangeLoading(false);
            swal.error(err.response?.data);
          });
      } else
        swal.error(
          "The new password does not match the first entry! Please re-enter",
          3000
        );
    },
    fetchTransaction() {
      this.systemStore.setChangeLoading(true);
      API_TRANSACTION.getTransaction()
        .then((res) => {
          this.transactions = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    reloadList() {
      this.fetchTransaction();
    },
    gotoDetail(item) {
      this.systemStore.setChangeLoading(true);
      API_TRANSACTION.getTransactionById(item?.id)
        .then((res) => {
          this.transactionDetail = res.data;
          this.isShowDetail = true;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
  },
};
</script>
