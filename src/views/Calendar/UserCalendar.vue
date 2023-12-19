<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto mt-5">
      <div
        class="w-[300px] min-h-[50px] relative br-c z-[30]"
        @click="isShowSelect = !isShowSelect"
        v-click-outside-element="close"
      >
        <div class="w-full flex items-center px-3 py-1 cursor-pointer">
          <div
            class="w-[50px] h-[50px] overflow-hidden flex items-center justify-center"
          >
            <img :src="userSelected.image" alt="user avt" />
          </div>
          <span class="ml-3">{{ userSelected.name }}</span>
        </div>
        <div
          class="absolute top-[105%] left-0 w-full max-h-[400px] overflow-y-scroll bg-gray-200 shadow-lg"
          v-show="isShowSelect"
        >
          <div
            class="w-full flex items-center px-3 py-1 hover:bg-gray-100 my-1 cursor-pointer"
            v-for="item in listUser"
            @click="changeUserSelected(item)"
          >
            <div
              class="w-[50px] h-[50px] overflow-hidden flex items-center justify-center"
            >
              <img :src="item.image" alt="user avt" />
            </div>
            <span class="ml-3">{{ item.name }}</span>
          </div>
        </div>
      </div>

      <!-- body calendar -->
      <div class="w-full">
      <div class="line"></div>
      <div class="w-full flex items-start justify-between flex-wrap">
        <div class="w-[30%]">
        
        </div>
        <div class="w-[70%]"></div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      isShowSelect: false,
      userSelected: {
        name: "Nguyen Van A",
        image:
          "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      },
      listUser: [
        {
          name: "Nguyen Van B",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },
        {
          name: "Nguyen Van C",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },
        {
          name: "Nguyen Van D",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },
        {
          name: "Nguyen Van D",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },{
          name: "Nguyen Van A",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },{
          name: "Nguyen Van F",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },{
          name: "Nguyen Van G",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },{
          name: "Nguyen Van X",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },{
          name: "Nguyen Van Z",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },{
          name: "Nguyen Van I",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },
      ],
    };
  },
  created() {},
  methods: {
    close() {
      this.isShowSelect = false;
    },
    changeUserSelected(item) {
      this.userSelected = item;
    },
  },
};
</script>
<style scoped>
.br-c {
  border: 1px solid rgb(198, 198, 198);
  border-radius: 10px;
  padding: 4px 8px;
}

.line {
  width: 100%;
  margin: 20px auto;
  height: 1px;
  background-color: rgb(221, 221, 221);
}
</style>
