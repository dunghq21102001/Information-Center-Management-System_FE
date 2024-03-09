<template>
  <div class="w-full">
    <p class="page-sub-title">General information</p>
    <div class="grid grid-cols-12 gap-3">
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="userName">User Name</label>
        <input
          id="userName"
          type="text"
          class="i-cus"
          v-model="data.userName"
        />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="fullName">Full Name</label>
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
        <label for="phone">Phone Number</label>
        <input id="phone" type="text" class="i-cus" v-model="data.phone" />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="birth">Date of Birth</label>
        <input
          id="birth"
          type="datetime-local"
          class="i-cus"
          v-model="data.dateOfBirth"
        />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="gender">Gender</label>
        <div class="flex items-center mt-[11px]">
          <div class="flex items-center mr-4">
            <input
              v-model="data.genderType"
              type="radio"
              id="male"
              value="Male"
            /><label class="ml-2" for="male">Male</label>
          </div>
          <div class="flex items-center">
            <input
              v-model="data.genderType"
              type="radio"
              id="female"
              value="Female"
            /><label class="ml-2" for="female">Female</label>
          </div>
        </div>
      </div>
      <div class="col-span-12 flex flex-col items-start">
        <label for="fullName">Address</label>
        <input type="text" class="i-cus" v-model="data.address" />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="bankName">Bank Name</label>
        <input
          id="bankName"
          type="text"
          class="i-cus"
          v-model="data.bankName"
        />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="bankAccName">Bank Account Name</label>
        <input
          id="bankAccName"
          type="text"
          class="i-cus"
          v-model="data.bankAccountName"
        />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="bankNumber">Bank Number</label>
        <input
          id="bankNumber"
          type="text"
          class="i-cus"
          v-model="data.bankAccountNumber"
        />
      </div>
      <div class="col-span-12 md:col-span-6 flex flex-col items-start">
        <label for="sts">Status</label>
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
        Save
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
        this.data.address.trim() == "" ||
        this.data.email.trim() == "" ||
        this.data.fullName.trim() == "" ||
        this.data.genderType == "" ||
        this.data.phone.trim() == "" ||
        this.data.userName.trim() == "" ||
        this.data.dateOfBirth.trim() == ""
      ) {
        return swal.error(
          "You should fill all information to update your profile"
        );
      }
      if (!this.isValidPhoneNumber(this.data.phone))
        return swal.error("Invalid phone number!");
      this.systemStore.setChangeLoading(true);
      API_USER.putUser(this.data)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          swal.success(res.data);
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
  },
};
</script>
