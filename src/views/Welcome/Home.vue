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
        <span class="block text-primary text-[44px] text-center md:text-left">{{
          item.total
        }}</span>
        <p class="text-gray-400 text-center md:text-left text-[22px]">
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
        <span class="text-[28px] text-primary">More than 300+ courses</span>
        <button class="btn-primary px-3 py-1 rounded-lg">
          <span class="">See more</span>
        </button>
      </div>
    </div>

    <!-- 4 -->
    <div class="w-full my-5">
      <span class="text-[54px] font-bold text-primary">Blogs</span>
      <div class="flex flex-col items-start">
        <div v-for="blog in blogs" class="w-full flex items-center">
          <div
            class="w-[200px] h-[100px] md:w-[300px] md:h-[200px] overflow-hidden flex items-center justify-center mr-5"
          >
            <img :src="blog.img" class="w-full object-fill cursor-pointer" alt="" />
          </div>
          <div class="w-[150px] md:w-[800px] xl:w-[1000px]">
            <div
              v-show="blog.isOutstanding == true"
              class="bg-primary px-3 py-1 rounded-lg w-[120px] md:w-[200px] text-center text-white"
            >
              <span class="text-[12px] md:text-[18px]">Outstanding Blog</span>
            </div>
            <p
              class="truncate-text hover:underline cursor-pointer w-full text-[18px] md:text-[24px] text-[#2c2b2b] font-bold"
            >
              {{ blog.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
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
      blogs: [
        {
          name: "Học viên đạt giải nhất cuộc thi quốc tế về thuật toán, dẫn đầu về phát triển năng lực dành cho trẻ em",
          img: "https://www.reliablesoft.net/wp-content/uploads/2019/12/free-images-for-blogs.jpg",
          isOutstanding: false,
        },
        {
          name: "·  A Universidade de Sydney está no topo em Impacto Social, enquanto a Australian National University vem em segundo lugar globalmente",
          img: "https://invoice.ng/blog/wp-content/uploads/2018/04/how-to-start-a-blog-in-nigeria.jpg",
          isOutstanding: true,
        },
        {
          name: "QS World University Rankings: Sustentabilidade 2024 QS Quacquarelli Symonds Logo",
          img: "https://www.redacteur.com/blog/wp-content/uploads/sites/6/2019/08/redacteur-blog-img-contenu-page-accueil.jpg",
          isOutstanding: false,
        },
        {
          name: "Học viên đạt giải nhất cuộc thi quốc tế về thuật toán, dẫn đầu về phát triển năng lực dành cho trẻ em",
          img: "https://www.reliablesoft.net/wp-content/uploads/2019/12/free-images-for-blogs.jpg",
          isOutstanding: false,
        },
        {
          name: "QS Reveals the World's Best Cities for Students QS Logo",
          img: "https://cloud.z.com/vn/wp-content/uploads/2023/11/how-to-write-a-blog-post.jpeg",
          isOutstanding: true,
        },
      ],
    };
  },
  created() {},
  methods: {},
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
