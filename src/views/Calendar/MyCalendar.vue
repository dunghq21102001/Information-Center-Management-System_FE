<template>
  <div class="w-full">
    <!-- <span
      v-if="scheduleFilter.length == 0"
      class="block w-full text-center font-bold text-gray-600 text-[24px]"
    >
      Bạn không có lịch dạy/học tính đến hiện tại
    </span> -->
    <Calendar
     
      :events="null"
      :is-permission="isPermission"
      @handle-click-event="handleClickEvent"
    />

    <!-- <Calendar :events="scheduleFilter" :is-permission="isPermission" /> -->
    <div class="fog-a" v-if="isShowAttendance" @click.self="cancelAll">
      <div
        class="w-[90%] md:w-[80%] lg:w-[78%] bg-white rounded-xl hide-scrollbar max-h-[95vh] overflow-y-scroll px-4"
      >
        <div class="sticky top-0 bg-white z-20 pt-5">
          <span class="block mb-5 font-bold text-[24px]">
            Điểm danh lớp {{ selectedClass }} ngày {{ selectedDateClass }}
          </span>
          <p class="w-full text-center" v-if="attendanceData.length == 0">
            Lớp học này chưa có học sinh
          </p>
          <div
            v-if="attendanceData.length > 0"
            class="w-full flex items-center mb-3"
          >
            <div
              class="font-bold br-c text-[20px] pl-2 text-white bg-[#6a90d9] w-[5%]"
            >
              STT
            </div>
            <div
              class="font-bold br-c text-[20px] pl-2 text-white text-center bg-[#6a90d9] w-[20%]"
            >
              Ảnh
            </div>
            <div
              class="font-bold br-c text-[20px] pl-2 text-white bg-[#6a90d9] w-[30%]"
            >
              Họ và tên
            </div>
            <div
              class="font-bold br-c text-[20px] pl-2 text-white bg-[#6a90d9] w-[20%]"
            >
              Điểm danh
            </div>
            <div
              class="font-bold br-c text-[20px] pl-2 text-white bg-[#6a90d9] w-[25%]"
            >
              Ghi chú
            </div>
          </div>
        </div>
        <div class="w-full flex flex-col items-start">
          <div
            class="w-full flex items-start justify-between mb-3"
            v-for="(item, index) in attendanceData"
            :key="item.id"
          >
            <div class="w-[5%] pl-2">{{ index + 1 }}</div>
            <div
              class="w-[20%] md:h-[150px] lg:h-[200px] overflow-hidden flex items-start justify-center"
            >
              <img
                :src="item.avatar"
                class="object-cover max-w-[150px]"
                alt=""
              />
            </div>
            <div class="w-[30%] pl-2">{{ item?.childrenName }}</div>
            <div class="w-[20%] pl-2 flex items-center">
              <div class="flex items-center mr-4">
                <input
                  type="radio"
                  :id="index + 'false'"
                  :value="false"
                  v-model="item.isAttendance"
                />
                <label :for="index + 'false'" class="ml-2">Không</label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  :id="index + 'true'"
                  :value="true"
                  v-model="item.isAttendance"
                />
                <label :for="index + 'true'" class="ml-2">Có</label>
              </div>
            </div>
            <div class="w-[25%] pl-2">
              <input
                type="text"
                v-model="item.note"
                placeholder="Ghi chú..."
                class="i-c"
              />
            </div>
          </div>
        </div>
        <div class="w-full flex items-center justify-end mb-4">
          <button
            class="btn-primary px-3 py-1"
            @click="checkAttendance"
            v-if="attendanceData.length > 0"
          >
            Lưu điểm danh
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API_ATTENDANCE from "../../API/API_ATTENDANCE";
import API_SCHEDULE from "../../API/API_SCHEDULE";
import func from "../../common/func";
import swal from "../../common/swal";
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
      isLoad: false,
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
      isShowAttendance: false,
      selectedClass: null,
      selectedDateClass: null,
      attendanceData: [],
    };
  },
  created() {
    // this.fetchSchedule();
    // this.fetchTest();
  },
  methods: {
    fetchSchedule() {
      this.systemStore.setChangeLoading(true);
      API_SCHEDULE.getAutomaticalySchedule(this.authStore.getAuth?.id)
        .then((res) => {
          let tmpData = [];
          tmpData = res.data.classes.map((cls) => {
            cls.schedules.map((schedule) => {
              schedule["classId"] = cls.id;
              schedule.classCode = cls.classCode;
              schedule.totalDuration = cls.totalDuration;
              schedule.teachingStartDate = cls.teachingStartDate;
              schedule.teachingEndDate = cls.teachingEndDate;
              return schedule;
            });
            return cls;
          });

          const listSchedules = tmpData.flatMap((cls) => cls.schedules);
          let finalData = [];
          let currentId = null;
          listSchedules.map((item) => {
            if (currentId != item.classId) {
              const startDate = new Date(item.teachingStartDate);
              let totalScheduleOfClassNow = 0;
              // => t3 + t6 (2 và 5)  => t4 + t7 (3 và 6)  => t5 + CN (4 và 0)
              let defaultNum = null;
              let nextNum = null;
              let theNextDate = startDate;
              let startIsFirstIndex = null;

              defaultNum = this.convertToNumber(listSchedules[0]?.dayInWeek);
              nextNum = this.convertToNumber(listSchedules[1]?.dayInWeek);
              // switch (item.dayInWeek) {
              //   case "Tuesday":
              //     defaultNum = 2;
              //     nextNum = 5;
              //     break;
              //   case "Wednesday":
              //     defaultNum = 3;
              //     nextNum = 6;
              //     break;
              //   case "Thursday":
              //     defaultNum = 4;
              //     nextNum = 0;
              //     break;
              //   case "Friday":
              //     defaultNum = 5;
              //     nextNum = 2;
              //     break;
              //   case "Saturday":
              //     defaultNum = 6;
              //     nextNum = 3;
              //     break;
              //   case "Sunday":
              //     defaultNum = 0;
              //     nextNum = 4;
              //     break;

              //   default:
              //     break;
              // }

              let conditionLoop = null;
              const endDate = new Date(item.teachingEndDate);
              if (endDate.getFullYear() == 1)
                conditionLoop = item.totalDuration;
              else conditionLoop = endDate;

              // if (defaultNum == 4 && defaultNum <= startDate.getDay()) {
              //   startIsFirstIndex = false;
              // } else if (defaultNum < startDate.getDay()) {
              //   startIsFirstIndex = false;
              // } else {
              //   startIsFirstIndex = true;
              // }

              // if (defaultNum < startDate.getDay()) startIsFirstIndex = false;
              // else startIsFirstIndex = true;

              if (typeof conditionLoop === "number") {
                do {
                  if (theNextDate.getDay() == defaultNum) {
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
                      scheduleId: listSchedules[0]?.id,
                      classId: item?.classId,
                      date: finalDate,
                    });
                    theNextDate.setDate(theNextDate.getDate() + 1);
                    startIsFirstIndex = !startIsFirstIndex;
                  } else if (theNextDate.getDay() == nextNum) {
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
                      scheduleId: listSchedules[1]?.id,
                      classId: item?.classId,
                      date: finalDate,
                    });
                    theNextDate.setDate(theNextDate.getDate() + 1);
                    startIsFirstIndex = !startIsFirstIndex;
                  }
                  // totalScheduleOfClassNow += 1;
                  theNextDate.setDate(theNextDate.getDate() + 1);
                } while (totalScheduleOfClassNow < item.totalDuration);
              } else {
                do {
                  if (theNextDate.getDay() == defaultNum) {
                    // totalScheduleOfClassNow += 1;
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
                      scheduleId: listSchedules[0]?.id,
                      classId: item?.classId,
                      date: finalDate,
                    });
                    theNextDate.setDate(theNextDate.getDate() + 1);
                    startIsFirstIndex = !startIsFirstIndex;
                  } else if (theNextDate.getDay() == nextNum) {
                    // totalScheduleOfClassNow += 1;
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
                      scheduleId: listSchedules[1]?.id,
                      classId: item?.classId,
                      date: finalDate,
                    });
                    theNextDate.setDate(theNextDate.getDate() + 1);
                    startIsFirstIndex = !startIsFirstIndex;
                  }
                  // totalScheduleOfClassNow += 1;
                  theNextDate.setDate(theNextDate.getDate() + 1);
                } while (theNextDate.getTime() < conditionLoop.getTime());
              }

              currentId = item.classId;
            }
          });

          this.scheduleFilter = finalData;
          this.isLoad = true;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    handleClickEvent(item) {
      this.selectedDateClass = func.convertDate(item?.date);
      this.selectedClass = item?.title;
      this.isShowAttendance = true;
      this.systemStore.setChangeLoading(true);
      const finalDate = item?.date.replaceAll("/", "-");
      API_ATTENDANCE.listAttendanceByClassIdAndDate(
        item?.classId,
        finalDate,
        item?.scheduleId
      )
        .then((res) => {
          let tmp = [];
          tmp = res.data.map((item) => {
            item["isAttendance"] =
              item.statusAttendance == "Attend" ? true : false;
            return item;
          });
          this.attendanceData = tmp;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    cancelAll() {
      this.isShowAttendance = false;
    },
    formatDate(date) {
      return dayjs(date).format("YYYY-M-D HH:mm");
    },
    convertToNumber(data) {
      // convert thứ thành số

      let d = 0;
      switch (data) {
        case "Monday":
          d = 1;
          break;
        case "Tuesday":
          d = 2;
          break;
        case "Wednesday":
          d = 3;
          break;
        case "Thursday":
          d = 4;
          break;
        case "Friday":
          d = 5;
          break;
        case "Saturday":
          d = 6;
          break;
        case "Sunday":
          d = 0;
          break;
        default:
          break;
      }

      return d;
    },
    checkAttendance() {
      this.systemStore.setChangeLoading(true);
      let fData = [];
      this.attendanceData.map((item) => {
        fData.push({
          id: item?.id,
          statusAttendance: item?.isAttendance == true ? 1 : 2,
          note: item?.note,
        });
      });
      API_ATTENDANCE.putAttendance(fData)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          swal.success(res.data);
          this.cancelAll();
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err.response?.data);
        });
    },
  },
};
</script>
<style scoped>
.fog-a {
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

.i-c {
  border: 1px solid rgb(194, 194, 194);
  border-radius: 5px;
  padding: 5px 10px;
  width: 100%;
}

.i-c:focus {
  outline: none;
}

.br-c {
  border-right: 1px solid white;
}
</style>
