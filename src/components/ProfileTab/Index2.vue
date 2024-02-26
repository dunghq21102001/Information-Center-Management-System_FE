<template>
  <div class="w-full">
    <p class="page-sub-title">Security</p>
    <div class="grid grid-cols-12 gap-3">
      <div class="col-span-12 flex flex-col items-start">
        <label for="curPass">Current Password</label>
        <input id="curPass" type="password" class="i-cus" v-model="curPass" />
      </div>
      <div class="col-span-12 flex flex-col items-start">
        <label for="newP">New Password</label>
        <input id="newP" type="password" class="i-cus" v-model="pass1" />
      </div>
      <div class="col-span-12 flex flex-col items-start">
        <label for="newPAgain">New Password Again</label>
        <input id="newPAgain" type="password" class="i-cus" v-model="pass2" />
      </div>
    </div>
    <div class="w-full flex items-center justify-end mt-5">
      <button class="btn-primary px-3 py-1 rounded-lg" @click="changePass">
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
      pass1: "",
      pass2: "",
      curPass: "",
    };
  },
  created() {},
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
            swal.success("Change password successfully!");
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
  },
};
</script>
