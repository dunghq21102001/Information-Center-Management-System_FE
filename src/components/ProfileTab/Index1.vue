<template>
  <div class="w-full">
    <p class="page-sub-title">Thông tin chung</p>
    <div class="grid grid-cols-12 gap-3">
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="userName">Tên đăng nhập</label>
        <input
          id="userName"
          type="text"
          class="i-cus"
          v-model="data.userName"
        />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="fullName">Họ và tên</label>
        <input
          id="fillName"
          type="text"
          class="i-cus"
          v-model="data.fullName"
        />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="email">Email</label>
        <input id="email" type="email" class="i-cus" v-model="data.email" />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="phone">Số điện thoại</label>
        <input id="phone" type="text" class="i-cus" v-model="data.phone" />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="birth">Sinh nhật</label>
        <input
          id="birth"
          type="datetime-local"
          class="i-cus"
          v-model="data.dateOfBirth"
        />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="gender">Giới tính</label>
        <div class="flex items-center mt-[11px]">
          <div class="flex items-center mr-4">
            <input
              v-model="data.genderType"
              type="radio"
              id="male"
              value="Nam"
            /><label class="ml-2" for="male">Nam</label>
          </div>
          <div class="flex items-center">
            <input
              v-model="data.genderType"
              type="radio"
              id="female"
              value="Nữ"
            /><label class="ml-2" for="female">Nữ</label>
          </div>
        </div>
      </div>
      <div class="col-span-12 flex flex-col items-start">
        <label for="fullName">Địa chỉ</label>
        <input type="text" class="i-cus" v-model="data.address" />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="bankName">Ngân hàng</label>
        <input
          id="bankName"
          type="text"
          class="i-cus"
          v-model="data.bankName"
        />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="bankAccName">Tên tài khoản</label>
        <input
          id="bankAccName"
          type="text"
          class="i-cus"
          v-model="data.bankAccountName"
        />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="bankNumber">Số tài khoản</label>
        <input
          id="bankNumber"
          type="text"
          class="i-cus"
          v-model="data.bankAccountNumber"
        />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="sts">Trạng thái</label>
        <input
          id="sts"
          type="text"
          class="i-cus cursor-not-allowed"
          disabled
          v-model="data.status"
        />
      </div>
    </div>
    <div class="w-full flex items-center justify-end mt-5">
      <button class="btn-primary px-3 py-1 rounded-lg" @click="updateAccount">
        Lưu
      </button>
    </div>
  </div>
</template>
<script>
import API_USER from "../../API/API_USER";
import swal from "../../common/swal";
import { useAuthStore } from "../../stores/Auth";
import { useSystemStore } from "../../stores/System";

export default {
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  props: {},
  components: {},
  data() {
    return {
      data: {
        userName: "",
        fullName: "",
        genderType: "",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        avatar: "",
        bankAccountNumber: "",
        bankAccountName: "",
        bankName: "",
        status: "",
      },
    };
  },
  mounted() {},
  created() {
    this.getUserById();
  },
  methods: {
    getUserById() {
      this.systemStore.setChangeLoading(true);
      API_USER.userById(this.authStore.getAuth?.id)
        .then((res) => {
          this.data = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    updateAccount() {
      if (
        this.data.address == null ||
        this.data.address.trim() == "" ||
        this.data.email == null ||
        this.data.email.trim() == "" ||
        this.data.fullName == null ||
        this.data.fullName.trim() == "" ||
        this.data.genderType == null ||
        this.data.genderType == "" ||
        this.data.phone == null ||
        this.data.phone.trim() == "" ||
        this.data.userName == null ||
        this.data.userName.trim() == "" ||
        this.data.dateOfBirth == null ||
        this.data.dateOfBirth.trim() == ""
      ) {
        return swal.error(
          "Bạn phải điền tất cả thông tin để cập nhật thông tin cá nhân"
        );
      }
      if (!this.isValidPhoneNumber(this.data.phone))
        return swal.error("Số điện thoại không hợp lệ!");
      this.systemStore.setChangeLoading(true);
      API_USER.putUser(this.data)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          swal.success(res.data);
          this.resetDataUserClient();
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err?.response?.data);
        });
    },
    isValidPhoneNumber(phoneNumber) {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phoneNumber);
    },
    resetDataUserClient() {
      this.systemStore.setChangeLoading(true);
      API_USER.userById(this.authStore.getAuth?.id)
        .then((res) => {
          localStorage.removeItem("userData");
          this.authStore.setAuth(res.data);
          const userData = JSON.stringify(res.data);
          localStorage.setItem("userData", userData);
          this.systemStore.setChangeLoading(false);
        })
        .catch((er) => {
          this.systemStore.setChangeLoading(false);
          swal.error("Có lỗi xảy ra, vui lòng thử lại!");
        });
    },
  },
};
</script>
