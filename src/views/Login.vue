<template>
  <div class="w-full relative">
    <img
      src="../assets/images/bg-login.png"
      class="h-screen right-0 top-0 z-10 hidden md:block"
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
            <input type="text" class="i-c" />
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
              <input :type="isShowPass ? 'text' : 'password'" class="i-c w-full" />
              <v-icon
                class="absolute top-[50%] translate-y-[-50%] cursor-pointer right-2"
                @click="isShowPass = !isShowPass"
                :name="isShowPass == false ? 'bi-eye-fill' : 'bi-eye-slash-fill'"
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
              <input :type="isShowPass ? 'text' : 'password'" class="i-c w-full" />
              <v-icon
                class="absolute top-[50%] translate-y-[-50%] cursor-pointer right-2"
                @click="isShowPass = !isShowPass"
                :name="isShowPass == false ? 'bi-eye-fill' : 'bi-eye-slash-fill'"
              />
            </div>
          </div>

          <button class="btn-primary w-full px-1 py-2 mt-4">
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
export default {
  data() {
    return {
      isLogin: true,
      isShowPass: false,
    };
  },
  methods: {},
  created() {},
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
