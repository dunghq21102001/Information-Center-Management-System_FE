<template>
  <div class="w-full">
    <span
      v-if="scheduleFilter.length == 0"
      class="block w-full text-center font-bold text-gray-600 text-[24px]"
    >
      Bạn không có lịch dạy/học tính đến hiện tại
    </span>
    <Calendar
      v-if="scheduleFilter.length > 0"
      :events="scheduleFilter"
      :is-permission="isPermission"
    />

    <!-- <Calendar :events="scheduleFilter" :is-permission="isPermission" /> -->
  </div>
</template>
<script>
import API_SCHEDULE from "../../API/API_SCHEDULE";
import Calendar from "../../components/Calendar.vue";
import { useAuthStore } from "../../stores/Auth";
import { useSystemStore } from "../../stores/System";
import dayjs from "dayjs";

export default {
  setup() {
    const authStore = useAuthStore();
    const systemStore = useSystemStore();
    return { authStore, systemStore };
  },
  props: {},
  components: { Calendar },
  data() {
    return {
      isPermission: {
        title: false,
        drag: false,
        resize: false,
        delete: false,
        create: false,
      },
      dataFetch: [
        {
          start: "2024-04-05 12:30:00",
          end: "2024-04-05 14:45:00",
          title: "Mowday",
          content: '<i class="icon material-icons">cake</i>',
          class: "type-3",
        },
        {
          start: "2024-4-5 12:30:00",
          end: "2024-4-5 14:45:00",
          title: "Mowday",
          class: "type-3",
        },
      ],
      scheduleFilter: [],
      dataTest: {
        teacherId: "09058006-d093-4482-2bd9-08dc53f7a804",
        classes: [
          {
            id: "a3b9999-545a-4c8c-94d5-08dc53c19e5d",
            courseId: "35aaca0f-e35d-47b4-bd27-a0029c937fa6",
            classCode: "JP201",
            statusOfClass: "Pending",
            totalDuration: 8,
            schedules: [
              {
                id: "171f7238-690e-4f8d-d1b6-08dc53c19e61",
                dayInWeek: "Wednesday",
                startDate: "2024-04-19T00:00:00",
                slot: {
                  id: "d42e7c30-ffd4-4a09-ac73-1d175f89a200",
                  name: "Slot3",
                  startTime: "12:30:00",
                  endTime: "14:45:00",
                  slotType: "Course",
                },
                rooms: [
                  {
                    id: "71e59a17-8984-4150-8c1e-08dc53e39736",
                    name: "NVH-281",
                  },
                ],
              },
              {
                id: "bfbf3af2-023a-45f7-d1b7-08dc53c19e61",
                dayInWeek: "Saturday",
                startDate: "2024-04-19T00:00:00",
                slot: {
                  id: "d42e7c30-ffd4-4a09-ac73-1d175f89a200",
                  name: "Slot3",
                  startTime: "12:30:00",
                  endTime: "14:45:00",
                  slotType: "Course",
                },
                rooms: [
                  {
                    id: "71e59a17-8984-4150-8c1e-08dc53e39736",
                    name: "NVH-281",
                  },
                ],
              },
            ],
          },
          {
            id: "a3b84281-545a-4c8c-94d5-08dc53c19e5d",
            courseId: "35aaca0f-e35d-47b4-bd27-a0029c937fa6",
            classCode: "CN201",
            statusOfClass: "Pending",
            totalDuration: 12,
            schedules: [
              {
                id: "171f7238-690e-4f8d-d1b6-08dc53c19e61",
                dayInWeek: "Tuesday",
                startDate: "2024-04-19T00:00:00",
                slot: {
                  id: "d42e7c30-ffd4-4a09-ac73-1d175f89a200",
                  name: "Slot3",
                  startTime: "12:30:00",
                  endTime: "14:45:00",
                  slotType: "Course",
                },
                rooms: [
                  {
                    id: "71e59a17-8984-4150-8c1e-08dc53e39736",
                    name: "NVH-281",
                  },
                ],
              },
              {
                id: "bfbf3af2-023a-45f7-d1b7-08dc53c19e61",
                dayInWeek: "Friday",
                startDate: "2024-04-19T00:00:00",
                slot: {
                  id: "d42e7c30-ffd4-4a09-ac73-1d175f89a200",
                  name: "Slot3",
                  startTime: "12:30:00",
                  endTime: "14:45:00",
                  slotType: "Course",
                },
                rooms: [
                  {
                    id: "71e59a17-8984-4150-8c1e-08dc53e39736",
                    name: "NVH-281",
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },
  created() {
    this.fetchSchedule();
    // this.fetchTest();
  },
  methods: {
    fetchTest() {
      let tmpData = [];
      tmpData = this.dataTest.classes.map((cls) => {
        cls.schedules.map((schedule) => {
          schedule["classId"] = cls.id;
          schedule.classCode = cls.classCode;
          schedule.totalDuration = cls.totalDuration;
          return schedule;
        });
        return cls;
      });

      const listSchedules = tmpData.flatMap((cls) => cls.schedules);
      let finalData = [];
      let currentId = null;
      listSchedules.map((item) => {
        if (currentId != item.classId) {
          const startDate = new Date(item.startDate);
          let totalScheduleOfClassNow = 0;
          // => t3 + t6 (2 và 5)  => t4 + t7 (3 và 6)  => t5 + CN (4 và 0)
          let defaultNum = null;
          let nextNum = null;
          let theNextDate = startDate;
          switch (item.dayInWeek) {
            case "Tuesday":
              defaultNum = 2;
              nextNum = 5;
              break;
            case "Wednesday":
              defaultNum = 3;
              nextNum = 6;
              break;
            case "Thursday":
              defaultNum = 4;
              nextNum = 0;
              break;
            case "Friday":
              defaultNum = 5;
              nextNum = 2;
              break;
            case "Saturday":
              defaultNum = 6;
              nextNum = 3;
              break;
            case "Sunday":
              defaultNum = 0;
              nextNum = 4;
              break;

            default:
              break;
          }
          do {
            if (
              theNextDate.getDay() == defaultNum ||
              theNextDate.getDay() == nextNum
            ) {
              totalScheduleOfClassNow += 1;
              let finalDate = dayjs(theNextDate).format("YYYY/MM/DD");
              let startTime = dayjs(
                `${finalDate} ${item.slot.startTime}`,
                "HH:mm:ss"
              ).format("HH:mm");
              let endTime = dayjs(
                `${finalDate} ${item.slot.endTime}`,
                "HH:mm:ss"
              ).format("HH:mm");
              finalData.push({
                start: `${finalDate} ${startTime}`,
                end: `${finalDate} ${endTime}`,
                title: item.classCode,
                content: `${item.rooms[0]?.name}`,
                class: "type-3",
              });
              theNextDate.setDate(theNextDate.getDate() + 1);
            }
            // totalScheduleOfClassNow += 1;
            theNextDate.setDate(theNextDate.getDate() + 1);
          } while (totalScheduleOfClassNow < item.totalDuration);
          currentId = item.classId;
        }
      });

      this.scheduleFilter = finalData;
    },
    fetchSchedule() {
      this.systemStore.setChangeLoading(true);
      API_SCHEDULE.getAutomaticalySchedule(this.authStore.getAuth?.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          let tmpData = [];
          tmpData = res.data.classes.map((cls) => {
            cls.schedules.map((schedule) => {
              schedule["classId"] = cls.id;
              schedule.classCode = cls.classCode;
              schedule.totalDuration = cls.totalDuration;
              return schedule;
            });
            return cls;
          });

          const listSchedules = tmpData.flatMap((cls) => cls.schedules);
          let finalData = [];
          let currentId = null;
          listSchedules.map((item) => {
            if (currentId != item.classId) {
              const startDate = new Date(item.startDate);
              let totalScheduleOfClassNow = 0;
              // => t3 + t6 (2 và 5)  => t4 + t7 (3 và 6)  => t5 + CN (4 và 0)
              let defaultNum = null;
              let nextNum = null;
              let theNextDate = startDate;
              switch (item.dayInWeek) {
                case "Tuesday":
                  defaultNum = 2;
                  nextNum = 5;
                  break;
                case "Wednesday":
                  defaultNum = 3;
                  nextNum = 6;
                  break;
                case "Thursday":
                  defaultNum = 4;
                  nextNum = 0;
                  break;
                case "Friday":
                  defaultNum = 5;
                  nextNum = 2;
                  break;
                case "Saturday":
                  defaultNum = 6;
                  nextNum = 3;
                  break;
                case "Sunday":
                  defaultNum = 0;
                  nextNum = 4;
                  break;

                default:
                  break;
              }
              do {
                if (
                  theNextDate.getDay() == defaultNum ||
                  theNextDate.getDay() == nextNum
                ) {
                  totalScheduleOfClassNow += 1;
                  let finalDate = dayjs(theNextDate).format("YYYY/MM/DD");
                  let startTime = dayjs(
                    `${finalDate} ${item.slot.startTime}`,
                    "HH:mm:ss"
                  ).format("HH:mm");
                  let endTime = dayjs(
                    `${finalDate} ${item.slot.endTime}`,
                    "HH:mm:ss"
                  ).format("HH:mm");
                  finalData.push({
                    start: `${finalDate} ${startTime}`,
                    end: `${finalDate} ${endTime}`,
                    title: item.classCode,
                    content: `${item.rooms[0]?.name}`,
                    class: "type-3",
                  });
                  theNextDate.setDate(theNextDate.getDate() + 1);
                }
                // totalScheduleOfClassNow += 1;
                theNextDate.setDate(theNextDate.getDate() + 1);
              } while (totalScheduleOfClassNow < item.totalDuration);
              currentId = item.classId;
            }
          });

          this.scheduleFilter = finalData;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    formatDate(date) {
      return dayjs(date).format("YYYY-M-D HH:mm");
    },
  },
};
</script>
