<template>
  <div class="w-full"></div>
</template>
<script>
export default {
  props: {
    id: String,
  },
  data() {
    return {
      idProp: this.id,
    };
  },
  created() {
    this.fetchCourseDetail();
  },
  methods: {
    fetchCourseDetail() {
        console.log(this.idProp);
    },
  },
};
</script>
