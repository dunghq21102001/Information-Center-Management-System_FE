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
          <span class="my-2 text-[18px]">Course Code: </span><br />
          <span class="my-2 text-[18px]">Course Name: </span><br />
          <span class="my-2 text-[18px]">Description: </span><br />
          <span class="my-2 text-[18px]">List Lessons: </span>
          <div class="w-full md:w-[90%] grid grid-cols-12 gap-3 p-2 bg-[#f1f1f1]">
            <div
              class="flex col-span-12 md:col-span-6 lg:col-span-4 flex-col items-start"
              v-for="child in coursesChild"
            >
              <span> <span class="font-bold">Name:</span> {{ child.name }}</span>
              <span> <span class="font-bold">Total children:</span> {{ child.children }}</span>
              <span> <span class="font-bold">Course:</span> {{ child.course }}</span>
            </div>
          </div>
        </div>
        <div class="w-full md:w-[30%] flex md:block flex-col">
          <div
            class="overflow-hidden flex items-center justify-center w-full h-[200px] md:w-[250px] md:h-[250px]"
          >
            <img
              src="https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340"
              class="object-cover"
              alt=""
            />
          </div>
          <span class="block w-full mt-1">259.000 VND</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API_COURSE from "../../API/API_COURSE";
import { useSystemStore } from "../../stores/System";

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
          name: "MC1059",
          price: 124356,
          children: "22/40",
          course: "Web fullstack",
        },
        {
          name: "AA5930",
          price: 124356,
          children: "5/40",
          course: "Lập trình robotic cơ bản 3",
        },
      ],
    };
  },
  created() {
    // this.getCourseDetail(this.$route.params.id);
  },
  methods: {
    getCourseDetail(id) {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getCourseById(id)
        .then((res) => {
          this.courseDetail = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
  },
};
</script>
