<template>
  <div class="w-full">
    <div class="mx-auto">
      <span class="text-[28px] font-bold block text-gray-700">
        Course Detail
      </span>

      <div
        class="flex items-start justify-between flex-col-reverse md:flex-row fl"
      >
        <div class="w-full md:w-[70%]">
          <span class="my-2 text-[18px]"
            ><span class="font-bold">Course Code:</span>
            {{ courseDetail?.courseCode }}</span
          ><br />
          <span class="my-2 text-[18px]"
            ><span class="font-bold">Course Name:</span>
            {{ courseDetail?.name }}</span
          ><br />
          <span class="my-2 text-[18px]"
            ><span class="font-bold">Description:</span>
            {{ courseDetail?.description }}</span
          ><br />
          <span class="my-2 text-[18px] font-bold">List Lessons:</span>
          <div
            class="w-full md:w-[90%] grid grid-cols-12 gap-3 p-2 bg-[#f1f1f1]"
          >
            <div
              class="bg-white rounded-md p-2 relative flex col-span-12 md:col-span-6 lg:col-span-4 flex-col items-start"
              v-for="child in lessonsChild"
            >
              <div class="absolute right-0 top-0">
                <v-icon
                  name="io-close-outline"
                  class="cursor-pointer"
                  scale="1"
                />
              </div>
              <span> {{ child.name }}</span>
            </div>
          </div>
          <span class="my-2 text-[18px] font-bold">List Classes: </span>
          <div
            class="w-full md:w-[90%] grid grid-cols-12 gap-3 p-2 bg-[#f1f1f1]"
          >
            <div
              class="flex col-span-12 md:col-span-6 lg:col-span-4 flex-col items-start"
              v-for="child in coursesChild"
            >
              <span>
                <span class="font-bold">Name: </span>
                {{ child.name }}
              </span>
              <span>
                <span class="font-bold">Total children:</span>
                {{ child.children }}</span
              >
              <span>
                <span class="font-bold">Course:</span> {{ child.course }}</span
              >
            </div>
          </div>
        </div>
        <div class="w-full md:w-[30%] flex md:block flex-col">
          <div
            class="overflow-hidden flex items-center justify-center w-full h-[400px] md:w-[250px] md:h-[250px]"
          >
            <img :src="courseDetail?.image" class="object-cover" alt="" />
          </div>
          <span class="block w-full mt-1">
            <span class="font-bold"> Price: </span>
            {{ convertVND(courseDetail?.price) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API_COURSE from "../../API/API_COURSE";
import { useSystemStore } from "../../stores/System";
import func from "../../common/func";
export default {
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  data() {
    return {
      courseDetail: null,
      coursesChild: [
        {
          name: "NVH - 295",
          price: 124356,
          children: "21/40",
          course: "Java 1",
        },
        {
          name: "HC106",
          price: 124356,
          children: "26/40",
          course: "Lập trình robotic cơ bản 1",
        },
        {
          name: "AA5930",
          price: 124356,
          children: "5/40",
          course: "Lập trình robotic cơ bản 3",
        },
      ],
      lessonsChild: [
        {
          name: "lesson1",
        },
        {
          name: "bai tap so 2 hoc",
        },
        {
          name: "lesson3",
        },
        {
          name: "lesson4",
        },
      ],
    };
  },
  created() {
    this.getCourseDetail(this.$route.params.id);
  },
  methods: {
    convertVND(price) {
      return func.convertVND(price);
    },
    getCourseDetail(id) {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getCourseById(id)
        .then((res) => {
          this.courseDetail = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.$router.push({ name: "not-found", params: { catchAll: "404" } });
          this.systemStore.setChangeLoading(false);
        });
    },
  },
};
</script>
