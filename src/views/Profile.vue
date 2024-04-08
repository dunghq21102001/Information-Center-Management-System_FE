<template>
  <div class="w-full">
    <div class="w-full h-[150px] pl-5 mt-5 flex items-end">
      <div class="w-[150px] h-[150px] overflow-hidden rounded-full">
        <img
          :src="
            authStore.getAuth?.avatar != null &&
            authStore.getAuth?.avatar != 'string'
              ? authStore.getAuth.avatar
              : 'https://static.vecteezy.com/system/resources/previews/004/819/327/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg'
          "
          alt="user img"
          class="w-[150px] h-[150px] object-cover"
        />
      </div>
      <div class="flex flex-col mb-1 ml-3">
        <span class="text-black text-[26px]">{{
          authStore.getAuth?.userName
        }}</span>
        <span class="text-gray-400 text-[16px]">{{
          authStore.getAuth?.roleName
        }}</span>
      </div>
    </div>

    <!-- body -->
    <div class="w-full flex items-start mt-5">
      <div class="lg:w-[20%]">
        <ul class="w-full">
          <li
            v-for="item in listTab"
            :class="`li-cus ${currentIndexTab == item.index ? 'active' : ''}`"
            @click="changeTab(item.index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="w-[80%] right-side">
        <Index1 v-show="currentIndexTab == 1" />
        <Index2 v-show="currentIndexTab == 2" />
        <Index3 v-show="currentIndexTab == 3" />
        <Index4 v-show="currentIndexTab == 4" />
      </div>
    </div>
  </div>
</template>
<script>
import menu from "../common/menu";
import Index1 from "../components/ProfileTab/Index1.vue";
import Index2 from "../components/ProfileTab/Index2.vue";
import Index3 from "../components/ProfileTab/Index3.vue";
import Index4 from "../components/ProfileTab/Index4.vue";
import { useAuthStore } from "../stores/Auth";
export default {
  props: {},
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  components: {
    Index1,
    Index2,
    Index3,
    Index4,
  },
  data() {
    return {
      currentIndexTab: 1,
      listTab: [],
    };
  },
  created() {
    this.genListTab();
  },
  watch: {
    "authStore.getAuth": function (newData, oldData) {
      this.genListTab();
    },
  },
  methods: {
    changeTab(index) {
      this.currentIndexTab = index;
    },
    genListTab() {
      if (this.authStore.getAuth?.roleName == "Parent") {
        this.listTab = menu.parentProfileMenu();
      } else {
        this.listTab = menu.staffProfileMenu();
      }
    },
  },
};
</script>
<style scoped>
.right-side {
  min-height: 60vh;
  padding: 10px 20px;
  border-top: 1px solid #007d88;
  border-left: 1px solid #007d88;
}

.li-cus {
  padding-left: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  margin: 0 0 8px 0;
  transition: 0.2s ease;
  border-top: 1px solid #d9eced;
  border-bottom: 1px solid #d9eced;
}

.li-cus:hover {
  color: #007d88;
  background-color: #d9eced;
}

.active {
  color: #007d88;
  background-color: #d9eced;
  border-color: #007d88;
  border-left: 1px solid #007d88;
}
</style>
