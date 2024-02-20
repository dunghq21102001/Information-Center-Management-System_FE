<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto">
    <img class="w-full max-h-[450px]" :src="data?.image"/>
      <div class="w-full">
      <span class="block text-center my-4 font-bold text-[40px]">
        {{ data?.title }}
      </span>
      <span class="text-[16px] text-gray-500">Date: {{ convertToDate(data?.creationDate) }} | Author: {{  }}</span>
    </div>
    <div class="my-5 w-full" v-html="data?.content"></div>
  </div>
    </div>
</template>
<script>
import API_BLOG from "../../API/API_BLOG";
import func from "../../common/func";
import { useSystemStore } from "../../stores/system";
export default {
  props: {
    id: String,
  },
  components: {},
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  data() {
    return {
      idProp: this.id,
      data: null,
    };
  },
  created() {
    this.fetchBlogDetail();
  },
  methods: {
    fetchBlogDetail() {
      this.systemStore.setChangeLoading(true);
      API_BLOG.getBlogById(this.idProp)
        .then((res) => {
          this.data = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    convertToDate(date) {
      return func.convertDate(date)
    }
  },
};
</script>
