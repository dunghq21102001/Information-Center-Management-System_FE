<template>
  <div class="w-full">
    <!-- 1 -->
    <div class="w-[95%] mx-auto overflow-hidden rounded-lg my-5">
      <img
        src="../../assets/images/banner-1.png"
        class="w-full object-fill"
        alt=""
      />
    </div>

    <!-- 2 -->
    <div class="my-10 grid grid-cols-12 w-full gap-4">
      <div
        v-for="item in statistics"
        class="col-span-12 md:col-span-6 lg:col-span-3"
      >
        <span class="block text-primary text-[34px] text-center md:text-left">{{
          item.total
        }}</span>
        <p class="text-gray-400 text-center md:text-left text-[20px]">
          {{ item.des }}
        </p>
      </div>
    </div>

    <!-- 3 -->
    <div class="w-full my-10 grid gap-4 grid-cols-12">
      <div
        v-for="course in coursesList"
        class="col-span-12 md:col-span-6 lg:col-span-3"
      >
        <div
          class="w-full overflow-hidden flex h-[200px] items-start justify-center"
        >
          <img
            :src="course.img"
            class="w-full object-fill h-[200px] cursor-pointer"
            alt=""
          />
        </div>
        <div class="w-full h-[80px]">
          <span
            :title="course.name"
            class="text-[24px] text-[#2c2b2b] font-bold truncate-text cursor-pointer hover:underline block mt-2"
          >
            {{ course.name }}
          </span>
        </div>
        <!-- <button class="h-btn btn-primary px-3 py-1 rounded-lg w-[200px]">
          See more
          <span>➜</span>
        </button> -->
      </div>
    </div>
    <div class="w-full flex items-center justify-center mb-5">
      <div class="flex items-center flex-col">
        <span class="text-[24px] text-primary">More than 300+ courses</span>
        <button class="btn-primary px-3 py-3 rounded-lg w-[300px]">
          <span class="">See more</span>
        </button>
      </div>
    </div>

    <!-- 4 -->
    <div class="w-full my-5">
      <span class="text-[44px] font-bold text-primary">Blogs</span>
      <div class="flex flex-col items-start mt-4">
        <div v-for="blog in blogs" class="w-full flex items-center">
          <div
            class="w-[200px] h-[100px] md:w-[300px] md:h-[200px] overflow-hidden flex items-center justify-center mr-5"
          >
            <img
              @click="selectBlog(blog)"
              :src="blog.image"
              class="w-full object-fill cursor-pointer"
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
              @click="selectBlog(blog)"
              class="truncate-text hover:underline cursor-pointer w-full text-[18px] md:text-[24px] text-[#2c2b2b] font-bold"
            >
              {{ blog.title }}
            </p>
          </div>
        </div>
        <div
          v-if="blogs.length > 4"
          class="w-full flex items-center justify-center"
        >
          <button class="btn-primary px-3 py-3 rounded-lg w-[300px]">
            <span class="">See more</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 5 / chat -->
    <!-- <div
      class="fixed right-5 bottom-5 rounded-full bg-blur flex items-center justify-center"
    >
      <v-icon name="bi-chat-dots-fill" />
    </div> -->
  </div>
</template>
<script>
import API_BLOG from "../../API/API_BLOG";
import { useSystemStore } from "../../stores/system";
export default {
  components: {},
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  data() {
    return {
      statistics: [
        { total: "40+", des: "Cơ sở trên toàn quốc" },
        {
          total: "590.000+",
          des: "Học sinh đã tốt nghiệp và đi ra thế giới từ KidProEdu",
        },
        {
          total: "36.5%",
          des: "Học sinh đang học tập và làm việc tại 12 quốc gia trên thế giới",
        },
        { total: "98%", des: "Tỷ lệ học viên có việc làm sau khi tốt nghiệp" },
      ],
      coursesList: [
        {
          name: "Khoá học AI cơ bản",
          img: "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
        },
        {
          name: "Khoá học Mỹ thuật số nâng cao",
          img: "https://www.venturelessons.com/wp-content/uploads/2020/05/digital-art-courses-scaled.jpg",
        },
        {
          name: "Nhập môn khoa học máy tính dành cho sinh viên và người sắp đi làm iên và người sắp đi làm",
          img: "https://som.edu.vn/wp-content/uploads/2023/12/giao-trinh-hoc-may-machine-learning-tao-som-1024x582.jpg",
        },
        {
          name: "Khoá học AI cơ bản",
          img: "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
        },
      ],
      blogs: [],
    };
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
<style scoped>
.truncate-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}
</style>
