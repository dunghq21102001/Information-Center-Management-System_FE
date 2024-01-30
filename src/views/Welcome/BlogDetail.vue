<template>
  <div class="w-full">
  
  </div>
</template>
<script>
export default {
  props: {
    id: String,
  },
  components: {},
  data() {
    return {
      idProp: this.id,
    };
  },
  created() {
    this.fetchBlogDetail();
  },
  methods: {
    fetchBlogDetail() {
      console.log(this.idProp);
    },
  },
};
</script>
