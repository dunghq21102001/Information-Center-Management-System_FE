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
        <input
          id="gender"
          type="text"
          disabled
          class="i-cus cursor-not-allowed"
          v-model="data.genderType"
        />
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
      <button class="btn-primary px-3 py-1 rounded-lg">Save</button>
    </div>
  </div>
</template>
<script>
import API_USER from "../../API/API_USER";
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
  },
};
</script>
