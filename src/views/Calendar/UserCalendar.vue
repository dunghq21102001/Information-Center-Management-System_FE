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
          <div class="w-[30%] flex items-start justify-between">
            <ul class="w-[30%]">
              <li class="li-h border-r-[#e5e5e5] border-r-solid border-r-[1px]">
                Classes
              </li>
              <li
                class="w-full is-active px-2 my-1 py-1 cursor-pointer hover:text-[#007d88] bb-c"
              >
                SE1502
              </li>
              <li
                class="w-full px-2 my-1 py-1 cursor-pointer hover:text-[#007d88] bb-c"
              >
                SE1505
              </li>
              <li
                class="w-full px-2 my-1 py-1 cursor-pointer hover:text-[#007d88] bb-c"
              >
                SE1506
              </li>
              <li
                class="w-full px-2 my-1 py-1 cursor-pointer hover:text-[#007d88] bb-c"
              >
                SE1509
              </li>
            </ul>
            <ul class="w-[70%]">
              <li class="li-h">Course</li>
              <li class="w-full px-2 my-1 py-1 bb-c">Lập trình cơ bản</li>
            </ul>
          </div>
          <div class="w-[70%]">
            <table class="w-full">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Slot</th>
                  <th>Room</th>
                  <th>Teacher</th>
                  <th>Attendance Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div class="px-2 py-[5px] text-center">1</div></td>
                  <td><div class="px-2 py-[5px]">Wednesday 03/01/2024</div></td>
                  <td><div class="px-2 py-[5px] text-center">4</div></td>
                  <td><div class="px-2 py-[5px] text-center">412</div></td>
                  <td><div class="px-2 py-[5px]">Nguyen Van A</div></td>
                  <td><div class="px-2 py-[5px] text-center">Present</div></td>
                </tr>
                <tr>
                  <td><div class="px-2 py-[5px] text-center">2</div></td>
                  <td><div class="px-2 py-[5px]">Wednesday 03/01/2024</div></td>
                  <td><div class="px-2 py-[5px] text-center">4</div></td>
                  <td><div class="px-2 py-[5px] text-center">412</div></td>
                  <td><div class="px-2 py-[5px]">Nguyen Van A</div></td>
                  <td><div class="px-2 py-[5px] text-center">Present</div></td>
                </tr>
                <tr>
                  <td><div class="px-2 py-[5px] text-center">3</div></td>
                  <td><div class="px-2 py-[5px]">Wednesday 03/01/2024</div></td>
                  <td><div class="px-2 py-[5px] text-center">4</div></td>
                  <td><div class="px-2 py-[5px] text-center">412</div></td>
                  <td><div class="px-2 py-[5px]">Nguyen Van A</div></td>
                  <td><div class="px-2 py-[5px] text-center">Present</div></td>
                </tr>
                <tr>
                  <td><div class="px-2 py-[5px] text-center">3</div></td>
                  <td><div class="px-2 py-[5px]">Wednesday 03/01/2024</div></td>
                  <td><div class="px-2 py-[5px] text-center">4</div></td>
                  <td><div class="px-2 py-[5px] text-center">412</div></td>
                  <td><div class="px-2 py-[5px]">Nguyen Van A</div></td>
                  <td><div class="px-2 py-[5px] text-center">Present</div></td>
                </tr>
                <tr>
                  <td><div class="px-2 py-[5px] text-center">3</div></td>
                  <td><div class="px-2 py-[5px]">Wednesday 03/01/2024</div></td>
                  <td><div class="px-2 py-[5px] text-center">4</div></td>
                  <td><div class="px-2 py-[5px] text-center">412</div></td>
                  <td><div class="px-2 py-[5px]">Nguyen Van A</div></td>
                  <td><div class="px-2 py-[5px] text-center">Present</div></td>
                </tr>
                <tr>
                  <td><div class="px-2 py-[5px] text-center">3</div></td>
                  <td><div class="px-2 py-[5px]">Wednesday 03/01/2024</div></td>
                  <td><div class="px-2 py-[5px] text-center">4</div></td>
                  <td><div class="px-2 py-[5px] text-center">412</div></td>
                  <td><div class="px-2 py-[5px]">Nguyen Van A</div></td>
                  <td><div class="px-2 py-[5px] text-center">Present</div></td>
                </tr>
              </tbody>
            </table>
          </div>
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
        },
        {
          name: "Nguyen Van A",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },
        {
          name: "Nguyen Van F",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },
        {
          name: "Nguyen Van G",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },
        {
          name: "Nguyen Van X",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },
        {
          name: "Nguyen Van Z",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        },
        {
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

.bb-c {
  border-bottom: 1px solid #d9eced;
}

.is-active {
  color: #007d88;
}

.li-h {
  background-color: #007d88;
  color: #fff;
  padding: 4px 8px;
  font-weight: bold;
}

th {
  background-color: #007d88;
  color: #fff;
  padding: 4px 8px;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid rgb(229, 229, 229);
}

td {
  border: 1px solid rgb(184, 184, 184);
}
</style>
