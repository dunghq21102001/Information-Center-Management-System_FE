<template>
  <div class="w-full relative">
    <img
      src="../assets/images/bg-login.png"
      class="h-screen right-0 top-0 z-10 hidden md:block w-screen"
      alt=""
    />
    <div class="w-full md:w-[80%] lg:w-[60%] z-20 absolute top-0 left-0">
      <div
        class="hidden md:block w-[90%] md:w-[50%] lg:w-[60%] mx-auto shadow-xl rounded-3xl mt-10 overflow-hidden bg-white"
      >
        <img
          src="../assets/images/logoForLogin.png"
          class="w-full object-fill"
          alt=""
        />
      </div>
      <div class="w-[90%] mx-auto md:w-[50%] lg:w-[60%] mt-10">
        <span class="block text-center font-bold text-[30px] text-primary">
          {{ isLogin ? "Login" : "Register" }}
        </span>
        <div class="w-full flex flex-col">
          <!-- username -->
          <div class="w-full flex flex-col">
            <span class="text-gray-600">
              <v-icon name="fa-user-alt" class="mr-3" />
              {{ isLogin ? "Username or Email" : "Username" }}
            </span>
            <input
              type="text"
              v-model="userName"
              class="i-c"
              @keydown.enter="login"
              ref="username"
            />
          </div>

          <!-- email -->
          <div v-show="isLogin == false" class="w-full flex flex-col mt-4">
            <span class="text-gray-600">
              <v-icon name="co-gmail" class="mr-3" />
              Email
            </span>
            <input type="text" class="i-c" />
          </div>

          <!-- pass -->
          <div class="w-full flex flex-col mt-4">
            <span class="text-gray-600">
              <v-icon name="fa-key" class="mr-3" />
              Password
            </span>
            <div class="w-full relative">
              <input
                :type="isShowPass ? 'text' : 'password'"
                class="i-c w-full"
                @keydown.enter="login"
                v-model="password"
              />
              <v-icon
                class="absolute top-[50%] translate-y-[-50%] cursor-pointer right-2"
                @click="isShowPass = !isShowPass"
                :name="
                  isShowPass == false ? 'bi-eye-fill' : 'bi-eye-slash-fill'
                "
              />
            </div>
          </div>

          <!-- pass again -->
          <div v-show="isLogin == false" class="w-full flex flex-col mt-4">
            <span class="text-gray-600">
              <v-icon name="fa-key" class="mr-3" />
              Password Again
            </span>
            <div class="w-full relative">
              <input
                :type="isShowPass ? 'text' : 'password'"
                class="i-c w-full"
              />
              <v-icon
                class="absolute top-[50%] translate-y-[-50%] cursor-pointer right-2"
                @click="isShowPass = !isShowPass"
                :name="
                  isShowPass == false ? 'bi-eye-fill' : 'bi-eye-slash-fill'
                "
              />
            </div>
          </div>

          <button @click="login" class="btn-primary w-full px-1 py-2 mt-4">
            {{ isLogin ? "Login" : "Register" }}
          </button>
          <span
            class="block mx-auto text-[16px] text-[#007d88] cursor-pointer hover:underline mt-2"
            >Forgot your password?</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API_USER from "../API/API_USER";
import swal from "../common/swal";
import { useSystemStore } from "../stores/System";
import { useAuthStore } from "../stores/Auth";
export default {
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  data() {
    return {
      isLogin: true,
      isShowPass: false,
      userName: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.systemStore.setChangeLoading(true);
      API_USER.login({
        userName: this.userName.trim(),
        password: this.password.trim(),
      })
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          swal.success("Login successfully");
          this.authStore.setAuth(res.data);
          localStorage.setItem("token", res.data?.token);
          const userData = JSON.stringify(res.data);
          localStorage.setItem("userData", userData);
          if (
            res.data?.roleName == "Admin" ||
            res.data?.roleName == "Manager"
          ) {
            this.$router.push({ name: "dashboard" });
          } else {
            this.$router.push({ name: "profile" });
          }
        })
        .catch((err) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
  },
  mounted() {
    this.$refs.username.focus();
  },
  created() {
    if (this.authStore.getAuth != null) {
      if (this.authStore.getAuth?.roleName == "Admin")
        this.$router.push({ name: "dashboard" });
      else this.$router.push({ name: "profile" });
    }
  },
};
</script>
<style scoped>
.i-c {
  border: 1px solid #d9eced;
  border-radius: 10px;
  outline-color: #007d88;
  padding: 10px 8px;
}
</style>
