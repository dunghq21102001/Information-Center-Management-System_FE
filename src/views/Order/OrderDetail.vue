<template>
  <div class="w-full">order detail
  
  <button @click="test">test</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {
    console.log(this.$route.params.coursesData);
  },
  methods: {
    test() {
        console.log(this.$route.params);
    }
  },
};
</script>
<style scoped></style>
