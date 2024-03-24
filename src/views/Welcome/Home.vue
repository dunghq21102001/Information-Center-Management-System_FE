<template>
  <div class="w-full">
    <!-- 1 -->
    <div class="w-[95%] mx-auto overflow-hidden rounded-lg my-5">
      <img
        src="../../assets/images/banner-1.png"
        class="w-full object-cover"
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
        v-for="course in courses"
        class="col-span-12 md:col-span-6 lg:col-span-3"
      >
        <div
          class="w-full overflow-hidden flex h-[200px] items-start justify-center"
        >
          <img
            :src="course.image"
            class="w-full object-cover h-[200px] cursor-pointer"
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
      </div>
    </div>
    <div
      v-if="courses.length > 4"
      class="w-full flex items-center justify-center mb-5"
    >
      <div class="flex items-center flex-col">
        <span class="text-[24px] text-primary">More than 300+ courses</span>
        <button class="btn-primary px-3 py-3 rounded-lg w-[300px]">
          <span class="">See more</span>
        </button>
      </div>
    </div>

    <!-- advice request -->
    <div
      class="adr-cus h-[900px] relative hidden md:block rounded-2xl overflow-hidden"
    >
      <div
        class="absolute w-[40%] h-[450px] flex flex-col items-start justify-around right-[80px] top-[150px]"
      >
        <input
          type="text"
          class="input-ad"
          placeholder="Họ và tên"
          v-model="adviceRequest.fullName"
        />
        <input
          type="text"
          class="input-ad"
          placeholder="Email"
          v-model="adviceRequest.email"
        />
        <input
          type="text"
          class="input-ad"
          placeholder="Số điện thoại"
          v-model="adviceRequest.phone"
        />
        <input
          type="text"
          class="input-ad"
          placeholder="Địa chỉ"
          v-model="adviceRequest.address"
        />
        <input
          v-tooltip="'Chọn ngày để thi đầu vào'"
          type="date"
          class="input-ad"
          @change="getListTime"
        />
        <select name="" id="" class="input-ad" v-model="adviceRequest.location">
          <option value="" disabled>Khu vực</option>
          <option :value="l?.name" v-for="l in locations">
            {{ l?.name }}
          </option>
        </select>

        <div @click="postAdviceRequest" id="breathing-button">
          Đăng ký tư vấn
        </div>
      </div>
    </div>

    <!-- 4 -->
    <div class="w-full my-5">
      <span v-if="blogs.length > 0" class="text-[44px] font-bold text-primary"
        >Blogs</span
      >
      <div class="flex flex-col items-start mt-4">
        <div v-for="blog in blogs" class="w-full flex items-center">
          <div
            class="w-[200px] h-[100px] md:w-[300px] md:h-[200px] overflow-hidden flex items-center justify-center mr-5"
          >
            <img
              @click="selectBlog(blog)"
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
import API_COURSE from "../../API/API_COURSE";
import API_LOCATION from "../../API/API_LOCATION";
import API_USER from "../../API/API_USER";
import { useSystemStore } from "../../stores/system";
import swal from "../../common/swal";
import axios from "axios";
export default {
  components: {},
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  data() {
    return {
      listTime: [],
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
      locations: [],
      blogs: [],
      courses: [],
      adviceRequest: {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        testDate: "",
        location: "",
      },
    };
  },
  created() {
    this.fetchBlog();
    this.fetchLocation();
    this.fetchCourse();
  },
  methods: {
    postAdviceRequest() {
      if (
        this.adviceRequest.fullName.trim() == "" ||
        this.adviceRequest.email.trim() == "" ||
        this.adviceRequest.location == "" ||
        this.adviceRequest.phone.trim() == "" ||
        this.adviceRequest.testDate.trim() == "" ||
        this.adviceRequest.address.trim() == ""
      ) {
        return swal.error("Bạn phải điền tất cả thông tin để đăng ký tư vấn");
      }
      if (
        this.adviceRequest.fullName.includes("@") ||
        this.adviceRequest.fullName.includes("@gmail") ||
        this.adviceRequest.fullName.includes("@email") ||
        this.adviceRequest.fullName.includes("gmail") ||
        this.adviceRequest.fullName.includes("email")
      )
        return swal.error(
          "Họ và tên không được chứa kí tự tương tự email",
          3000
        );
      this.systemStore.setChangeLoading(true);
      API_USER.postAdviceRequest(this.adviceRequest)
        .then((res) => {
          swal.success(
            "Bạn đã đăng ký tư vấn thành công! Vui lòng chờ đợi chúng tôi liên lạc qua email hoặc số điện thoại",
            3000
          );
          this.systemStore.setChangeLoading(false);
          this.adviceRequest = {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            location: "",
          };
        })
        .catch((err) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    selectBlog(item) {
      this.$emit("selectBlog", item);
    },
    getListTime(e) {
      const date = new Date(e.target.value).toLocaleDateString();
      this.adviceRequest.testDate = date;
      const fData = date.toString().replaceAll("/", "-");
      API_USER.getListTestDate(fData)
        .then((res) => {
          let tmpData = res.data;
          let fData = [];
          tmpData.forEach((item) => {
            const startTime = new Date(item.startTime);
            const endTime = new Date(item.endTime);
            item.startTime = startTime.toLocaleTimeString();
            item.endTime = endTime.toLocaleTimeString();
            fData.push({
              startTime: item.startTime,
              endTime: item.endTime,
            });
          });

          console.log(fData);
        })
        .catch((err) => {});
    },
    fetchLocation() {
      this.systemStore.setChangeLoading(true);
      API_LOCATION.getLocations()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.locations = res.data;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchCourse() {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getCourses()
        .then((res) => {
          this.courses = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
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

.adr-cus {
  background: url("../../assets/images/addvice-request.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
}

.input-ad {
  padding: 10px 10px;
  outline: none;
  border-radius: 10px;
  width: 100%;
}

#breathing-button {
  width: 100%;
  padding: 12px;
  border: 1px solid #3cc8b4;
  -webkit-animation: breathing 2s ease-out infinite normal;
  animation: breathing 2s ease-out infinite normal;
  font-size: 16px;
  background: #3cc8b4;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
}

@-webkit-keyframes breathing {
  0% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }

  25% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  60% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }

  100% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
}

@keyframes breathing {
  0% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }

  25% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  60% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }

  100% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }
}
</style>
