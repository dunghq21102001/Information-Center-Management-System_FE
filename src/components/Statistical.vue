<template>
  <div class="w-full grid grid-cols-12 gap-3">
    <!-- 1 -->
    <div
      @click="goToRoute('users')"
      class="col-span-12 md:col-span-6 lg:col-span-3 cursor-pointer hover:shadow-lg duration-100 box"
    >
      <div class="flex flex-col items-start xl:items-center text-[18px]">
        <span>{{
          dashboardData?.totalParent +
          dashboardData?.totalStaff +
          dashboardData?.totalTeacher +
          dashboardData?.totalManager
        }}</span>
        <span>Người dùng</span>
      </div>
      <v-icon
        name="hi-user-group"
        :scale="1.5"
        :fill="`#${systemStore.getTheme.color}`"
      />
    </div>
    <!-- 2 -->
    <div
      class="col-span-12 md:col-span-6 lg:col-span-3 cursor-pointer hover:shadow-lg duration-100 box"
    >
      <div class="flex flex-col items-start xl:items-center text-[18px]">
        <span>{{convertVND(dashboardData?.totalAmountTransaction)}}</span>
        <span>Doanh thu</span>
      </div>
      <v-icon
        name="gi-receive-money"
        :scale="1.5"
        :fill="`#${systemStore.getTheme.color}`"
      />
    </div>
    <!-- 3 -->
    <div
      class="col-span-12 md:col-span-6 lg:col-span-3 cursor-pointer hover:shadow-lg duration-100 box"
    >
      <div class="flex flex-col items-start xl:items-center text-[18px]">
        <span>{{ dashboardData?.totalChildren }}</span>
        <span>Học sinh</span>
      </div>
      <v-icon
        name="gi-pay-money"
        :scale="1.5"
        :fill="`#${systemStore.getTheme.color}`"
      />
    </div>
    <!-- 4 -->
    <div
      @click="goToRoute('courses')"
      class="col-span-12 md:col-span-6 lg:col-span-3 cursor-pointer hover:shadow-lg duration-100 box"
    >
      <div class="flex flex-col items-start xl:items-center text-[18px]">
        <span>{{ dashboardData?.totalCourse }}</span>
        <span>Khoá học</span>
      </div>
      <v-icon
        name="gi-book-cover"
        :scale="1.5"
        :fill="`#${systemStore.getTheme.color}`"
      />
    </div>
  </div>
</template>
<script>
import { useSystemStore } from "../stores/system";
import API_COURSE from "../API/API_COURSE";
import func from '../common/func'
import API_USER from "../API/API_USER";
export default {
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  components: {},
  props: {
    dashboardData: Object,
  },
  data() {
    return {
      usersData: [],
      equipmentData: [],
      courseData: [],
    };
  },
  created() {
    // this.fetchUsersList();
    // this.fetchCourses()
  },
  methods: {
    goToRoute(pathName) {
      this.$router.push({ name: pathName });
    },
    fetchUsersList() {
      this.systemStore.setChangeLoading(true);
      API_USER.users()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.usersData = res.data;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    fetchCourses() {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getCourses()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.courseData = res.data;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    convertVND(price) {
      return func.convertVND(price)
    }
  },
};
</script>
<style scoped>
.box {
  border: 1px solid #d9eced;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
}
</style>
