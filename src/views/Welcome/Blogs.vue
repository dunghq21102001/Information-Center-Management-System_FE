<template>
  <div class="w-full">
    <div class="w-full my-5">
      <span class="text-[44px] font-bold text-primary">Blogs</span>
      <div class="flex flex-col items-start mt-4">
        <div
          @click="selectBlog(blog)"
          v-for="blog in blogs"
          class="w-full flex items-center hover:bg-gray-100 cursor-pointer"
        >
          <div
            class="w-[200px] h-[100px] md:w-[300px] md:h-[200px] overflow-hidden flex items-center justify-center mr-5"
          >
            <img
              :src="blog.image"
              class="w-full object-cover cursor-pointer"
              alt=""
            />
          </div>
          <div class="w-[150px] md:w-[800px] xl:w-[1000px]">
            <div
              class="px-3 py-1 rounded-lg flex items-center flex-wrap w-full"
            >
              <span
                class="block bg-primary rounded-md mx-2 min-w-[50px] text-center text-white text-[18px] max-w-[200px]"
                v-for="t in blog.tags"
              >
                {{ t }}
              </span>
            </div>
            <p
              class="truncate-text hover:underline cursor-pointer w-full text-[18px] md:text-[24px] text-[#2c2b2b] font-bold"
            >
              {{ blog.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API_BLOG from "../../API/API_BLOG";
import { useSystemStore } from "../../stores/system";

export default {
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  components: {},
  data() {
    return { blogs: [] };
  },
  created() {
    this.fetchBlog();
  },
  methods: {
    selectBlog(item) {
      this.$emit("selectBlog", item);
    },
    fetchBlog() {
      this.systemStore.setChangeLoading(true);
      API_BLOG.getBlogs()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.blogs = res.data;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
  },
};
</script>
