<template>
    <div class="w-full">
        <div class="w-[90%] mx-auto min-h-screen">
        </div>
    </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      coursesList: [],
    };
  },
  created() {
    this.fetchCourseList();
  },
  methods: {
    fetchCourseList() {},
  },
};
</script>
