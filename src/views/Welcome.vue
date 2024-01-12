<template>
  <div class="w-full">
    <WelcomeHeader @change-tab="changTab" />
    <div class="w-[90%] mx-auto min-h-screen">
      <Home v-if="tab == 0" />
      <TrainingProgram v-else-if="tab == 1" />
      <Blogs v-else-if="tab == 2" />
      <CourseDetail :id="courseId" v-else/>
    </div>
    <WelcomeFooter />
  </div>
</template>
<script>
import TrainingProgram from "./Welcome/TrainingProgram.vue";
import Blogs from "./Welcome/Blogs.vue";
import Home from "./Welcome/Home.vue";
import WelcomeHeader from "../components/WelcomeHeader.vue";
import WelcomeFooter from "../components/WelcomeFooter.vue";
import CourseDetail from "./Welcome/CourseDetail.vue";
export default {
  components: {
    TrainingProgram,
    Blogs,
    Home,
    WelcomeHeader,
    WelcomeFooter,
    CourseDetail
},
  data() {
    return {
      coursesList: [],
      mostOutstandingCoursesList: [],
      tab: 0,
      courseId: ''
    };
  },
  created() {
    this.fetchCourseList();
  },
  methods: {
    fetchCourseList() {},
    changTab(i) {
      this.tab = i;
    },
  },
};
</script>
