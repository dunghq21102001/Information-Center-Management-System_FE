<template>
  <div class="w-full">
    <!-- 1 -->
    <div class="relative w-[95%] mx-auto overflow-hidden rounded-lg my-5">
      <img
        src="../../assets/images/banner-1.png"
        class="w-full object-cover"
        alt=""
      />

      <div class="w-[50%] absolute bottom-[20px] left-[50%] translate-x-[-50%]">
        <div @click="scrollToAdvice" id="breathing-button">
          Đăng ký tư vấn ngay
        </div>
      </div>
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
        @click="handleGetDetail(course)"
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
      <!-- <div class="flex items-center flex-col">
        <span class="text-[24px] text-primary">More than 300+ courses</span>
        <button class="btn-primary px-3 py-3 rounded-lg w-[300px]">
          <span class="">See more</span>
        </button>
      </div> -->
    </div>

    <!-- advice request -->
    <div
      id="av"
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
        <select name="" id="" class="input-ad" v-model="adviceRequest.location">
          <option value="" disabled>Chọn khu vực của trung tâm gần bạn</option>
          <option :value="l?.id" v-for="l in locations">
            {{ l?.name }}
          </option>
        </select>
        <div class="w-full flex items-start justify-between">
          <div
            class="w-[38%] flex flex-col items-start justify-between h-[110px]"
          >
            <input
              v-tooltip="
                'Chọn ngày để thi đầu vào, tại khoảng thời gian mà bạn đăng ký dưới đây, bạn cần có mặt tại khu vực mà bạn đã đăng ký'
              "
              type="date"
              class="input-ad"
              @change="getListTime"
            />
            <div
              class="bg-white rounded-xl px-2 w-full py-1"
              v-if="selectedHour.id != ''"
            >
              Đã chọn khung giờ: <br />
              {{ selectedHour.startTime }} - {{ selectedHour.endTime }}
            </div>
          </div>
          <div
            class="w-[60%] grid gap-3 grid-cols-12 max-h-[110px] overflow-y-scroll bg-white rounded-2xl hide-scrollbar py-2"
          >
            <div
              v-for="slot in slots"
              class="flex relative items-center justify-center col-span-12 hover:bg-gray-300 py-2 px-1"
              :class="[
                selectedHour.startTime == slot?.startTime
                  ? 'bg-primary text-white hover:bg-primary'
                  : '',
                slot?.total >= 5
                  ? 'cursor-not-allowed bg-red-500 text-white hover:bg-red-500'
                  : 'cursor-pointer',
              ]"
              @click="selectHour(slot)"
            >
              {{ slot?.startTime }} - {{ slot?.endTime }} (Còn lại
              {{ 5 - slot?.total }} chỗ)
              <div
                v-show="adviceRequest.testDate == ''"
                class="absolute top-0 left-0 right-0 bottom-0 bg-black/0 cursor-not-allowed"
                v-tooltip="
                  'Bạn phải chọn ngày ở bên trái sau đó mới chọn mốc thời gian'
                "
              ></div>
            </div>
          </div>
        </div>

        <div @click="postAdviceRequest" id="breathing-button">
          Đăng ký tư vấn chi tiết
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
                class="block bg-primary rounded-md px-2 py-1 mx-2 min-w-[50px] text-center text-white text-[18px] max-w-[200px]"
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

    <!-- course detail -->
    <div
      class="fog"
      v-if="isShowCourseDetail"
      @click.self="isShowCourseDetail = false"
    >
      <div class="bg-white rounded-md w-[95%] h-[90vh] p-4 overflow-y-scroll">
        <div class="w-full flex flex-col items-center">
          <div class="w-[300px]">
            <img :src="courseDetail?.image" alt="" />
          </div>
          <span class="font-bold text-[24px]">{{ courseDetail?.name }}</span>
          <p class="text-gray-600 text-[18px] text-center mt-5">
            {{ courseDetail?.description }}
          </p>
          <p class="text-gray-600 text-[18px] text-center mt-5">
            Số buổi học:
            <span class="text-black font-bold">{{
              courseDetail?.durationTotal
            }}</span>
            / Loại khoá học:
            <span class="text-black font-bold">
              {{
                courseDetail?.courseType == "Single"
                  ? "Khoá học đơn"
                  : "Khoá học nhiều cấp độ"
              }}
            </span>
          </p>
        </div>
        <span class="block text-[20px] mt-10"
          >Danh sách bài học sẽ được học trong khoá học này:
        </span>
        <ul class="list-disc list-inside">
          <li v-for="(item, index) in courseDetail?.lessons" :key="index">
            Bài học {{ item?.lessonNumber }}: {{ item?.name }} / Số buổi học:
            {{ item?.duration }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import API_BLOG from "../../API/API_BLOG";
import API_COURSE from "../../API/API_COURSE";
import API_LOCATION from "../../API/API_LOCATION";
import API_USER from "../../API/API_USER";
import { useSystemStore } from "../../stores/system";
import API_SLOT from "../../API/API_SLOT";
import swal from "../../common/swal";
import dayjs from "dayjs";
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
        { total: "2+", des: "Cơ sở trên toàn quốc" },
        {
          total: "60.000+",
          des: "Học sinh đã tốt nghiệp và đi ra thế giới từ KidProEdu",
        },
        {
          total: "36.5%",
          des: "Học sinh đang học tập và làm việc tại 12 quốc gia trên thế giới",
        },
        { total: "98%", des: "Tỷ lệ học viên có việc làm sau khi tốt nghiệp" },
      ],
      locations: [],
      slots: [],
      slotsBK: [],
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
      selectedHour: {
        id: "",
        startTime: "",
        endTime: "",
      },
      isShowCourseDetail: false,
      courseDetail: null,
    };
  },
  created() {
    this.fetchBlog();
    this.fetchLocation();
    this.fetchCourse();
    this.fetchSlots();
  },
  methods: {
    fetchSlots() {
      this.systemStore.setChangeLoading(true);
      API_SLOT.getSlots()
        .then((res) => {
          let fData = [];
          fData = res.data.filter((item) => {
            item["endTime"] = item.endTime.slice(0, 5);
            item["startTime"] = item.startTime.slice(0, 5);
            if (item?.slotType == 2) return item;
          });

          fData.sort((a, b) => {
            const timeA = new Date("1970-01-01T" + a.startTime);
            const timeB = new Date("1970-01-01T" + b.startTime);
            return timeA - timeB;
          });

          fData.forEach((element) => {
            element["total"] = 0;
          });
          this.slots = fData;
          this.slotsBK = fData;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    handleGetDetail(course) {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getCourseById(course?.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.isShowCourseDetail = true;
          this.courseDetail = res.data;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    postAdviceRequest() {
      if (
        this.adviceRequest.fullName.trim() == "" ||
        this.adviceRequest.email.trim() == "" ||
        this.adviceRequest.location == "" ||
        this.adviceRequest.phone.trim() == "" ||
        this.adviceRequest.testDate.trim() == "" ||
        this.adviceRequest.address.trim() == "" ||
        this.selectedHour.id == ""
      ) {
        return swal.error("Bạn phải điền tất cả thông tin để đăng ký tư vấn");
      }

      if (
        this.adviceRequest.fullName.includes("@") ||
        this.adviceRequest.fullName.includes("@gmail") ||
        this.adviceRequest.fullName.includes("@email") ||
        this.adviceRequest.fullName.includes("fpt") ||
        this.adviceRequest.fullName.includes("edu") ||
        this.adviceRequest.fullName.includes("eco") ||
        this.adviceRequest.fullName.includes("vn") ||
        this.adviceRequest.fullName.includes("email")
      ) {
        return swal.error(
          "Họ và tên không được chứa kí tự tương tự email",
          3000
        );
      }

      this.systemStore.setChangeLoading(true);

      const formattedDate = dayjs(
        this.adviceRequest.testDate,
        "M/D/YYYY"
      ).format("YYYY-MM-DD");

      console.log(formattedDate);

      const startTime = formattedDate + "T" + this.selectedHour.startTime;
      const endTime = formattedDate + "T" + this.selectedHour.endTime;

      API_USER.postAdviceRequest({
        userId: null,
        fullName: this.adviceRequest.fullName,
        email: this.adviceRequest.email,
        phone: this.adviceRequest.phone,
        address: this.adviceRequest.address,
        locationId: this.adviceRequest.location,
        testDate: formattedDate,
        slotId: this.selectedHour.id,
        startTime: startTime,
        endTime: endTime,
        isTested: false,
      })
        .then((res) => {
          swal.success(
            "Bạn đã đăng ký tư vấn thành công! Vui lòng chờ đợi chúng tôi liên lạc qua email hoặc số điện thoại",
            3500
          );
          this.systemStore.setChangeLoading(false);
          this.adviceRequest = {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            testDate: "",
            location: "",
          };

          this.selectedHour = {
            id: "",
            startTime: "",
            endTime: "",
          };

          this.slots = this.slotsBK;
        })
        .catch((err) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    scrollToAdvice() {
      const adviceSection = document.getElementById("av");
      if (adviceSection) {
        adviceSection.scrollIntoView({ behavior: "smooth" });
      }
    },
    selectBlog(item) {
      this.$emit("selectBlog", item);
    },
    getListTime(e) {
      this.resetTotal();
      // this.systemStore.setChangeLoading(true);
      const date = new Date(e.target.value).toISOString();
      this.adviceRequest.testDate = date;
      const fData = date.toString().replaceAll("/", "-");
      API_USER.getListTestDate(fData)
        .then((res) => {
          res.data.forEach((item) => {
            const startTime = new Date(item.startTime).toLocaleTimeString(
              "en-US",
              { hour12: false }
            );
            this.slots.forEach((hour) => {
              if (startTime.toString().slice(0, 5) === hour.startTime) {
                hour.total++;
              }
            });
          });

          // this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          // this.systemStore.setChangeLoading(false);
        });
    },
    resetTotal() {
      this.slots.forEach((item) => {
        item["total"] = 0;
        return item;
      });
    },
    selectHour(slot) {
      if (this.adviceRequest.testDate == "") return;
      if (slot?.total >= 5)
        return swal.error(
          "Lịch này đã đủ số người đăng ký, vui lòng chọn thời gian khác",
          3000
        );

      this.selectedHour.id = slot?.id;
      this.selectedHour.startTime = slot?.startTime;
      this.selectedHour.endTime = slot?.endTime;
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
      API_COURSE.getCoursesInBlog()
        .then((res) => {
          let i = 0;
          let tmp = [];
          res.data.map((item) => {
            i += 1;
            if (i < 5) {
              tmp.push(item);
            }
          });
          this.courses = tmp;
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

.fog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
