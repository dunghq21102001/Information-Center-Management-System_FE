<template>
  <div class="w-full">
    <WelcomeHeader @change-tab="changTab" />
    <div class="w-[90%] mx-auto min-h-screen">
      <Home v-if="tab == 0" @select-blog="selectBlog" />
      <TrainingProgram v-else-if="tab == 1" />
      <Blogs v-else-if="tab == 2" />
      <CourseDetail :id="courseId" v-else-if="tab == 'course'" />
      <BlogDetail :id="blogId" v-else-if="tab == 'blog'" />
    </div>
    <WelcomeFooter />
  </div>
</template>
<script>
import TrainingProgram from "./Welcome/TrainingProgram.vue";
import Blogs from "./Welcome/Blogs.vue";
import BlogDetail from "./Welcome/BlogDetail.vue";
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
    CourseDetail,
    BlogDetail,
  },
  data() {
    return {
      coursesList: [],
      mostOutstandingCoursesList: [],
      tab: 0,
      courseId: "",
      blogId: "",
    };
  },
  watch: {
    tab(to, from) {
      window.scrollTo(0, 0);
    },
  },
  created() {
    this.fetchCourseList();
  },
  methods: {
    fetchCourseList() {},
    changTab(i) {
      this.tab = i;
    },
    selectCourse(i) {
      this.tab = "course";
      this.courseId = i.name
    },
    selectBlog(i) {
      this.tab = "blog";
      this.blogId = i.name;
    },
  },
};
</script>
