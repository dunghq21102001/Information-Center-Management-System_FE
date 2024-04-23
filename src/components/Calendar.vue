<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto h-[550px]" v-if="fData.length > 0">
      <vue-cal
        locale="vi"
        :editable-events="{
          title: isPermissionProp.title,
          drag: isPermissionProp.drag,
          resize: isPermissionProp.resize,
          delete: isPermissionProp.delete,
          create: isPermissionProp.create,
        }"
        class="vuecal--full-height-delete"
        active-view="week"
        events-on-month-view="short"
        @event-drag-create="showEventCreationDialog = true"
        :drag-to-create-event="isPermissionProp.create"
        :on-event-create="onEventCreate"
        :events="fData"
        :on-event-click="handleClickEvent"
      />
    </div>

    <div class="bg-fog" v-show="showEventCreationDialog">
      <div
        class="w-[90%] md:w-[50%] bg-white rounded-xl overflow-y-scroll hide-scrollbar pb-3"
      >
        <!-- title -->
        <div class="h-[50px] w-full bg-[#d9eced] px-3">
          <input
            type="text"
            class="i-cus bg-[#d9eced]"
            placeholder="Title"
            v-model="selectedEvent.title"
          />
        </div>

        <!-- content -->
        <div class="w-full bg-white px-3 mt-3">
          <textarea
            class="w-full outline-none i-cus resize-none"
            rows="3"
            placeholder="Content"
            v-model="selectedEvent.content"
          ></textarea>
          <select @change="changeBgColor" class="w-full select-primary py-3">
            <option v-for="item in eventsCssClasses" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="w-full px-3 flex items-center justify-end mt-3">
          <button
            class="px-3 py-1 rounded-md btn-cancel"
            @click="cancelEventCreation"
          >
            Cancel
          </button>
          <button
            class="ml-4 px-3 py-1 rounded-md btn-primary"
            @click="closeCreationDialog"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { useSystemStore } from "../stores/system";
import { useAuthStore } from "../stores/Auth";
import API_SCHEDULE from "../API/API_SCHEDULE";
import dayjs from "dayjs";

export default {
  setup(props) {
    const eventsProp = ref(props.events);
    watch(
      () => props.events,
      (newValue) => {
        eventsProp.value = newValue;
      }
    );

    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return {
      eventsProp,
      systemStore,
      authStore,
    };
  },
  props: {
    events: Array,
    isPermission: Object,
  },
  components: {},
  data() {
    return {
      // eventsProp: this.events,
      isPermissionProp: this.isPermission,
      selectedEvent: {
        title: "",
        content: "",
        start: "",
        end: "",
        class: "type-1",
        background: false,
      },

      fData: [
        {
          start: "2018-11-19 10:35",
          end: "2018-11-19 11:30",
          title: "Doctor appointment",
        },
        {
          start: "2018-11-19 18:30",
          end: "2018-11-19 19:15",
          title: "Dentist appointment",
        },
        {
          start: "2018-11-20 18:30",
          end: "2018-11-20 20:30",
          title: "Crossfit",
        },
        {
          start: "2018-11-21 11:00",
          end: "2018-11-21 13:00",
          title: "Brunch with Jane",
        },
        {
          start: "2018-11-21 19:30",
          end: "2018-11-21 23:00",
          title: "Swimming lesson",
        },
        {
          start: "2019-09-30 19:30",
          end: "2019-09-30 23:00",
          title: "Swimming lesson",
        },
        {
          start: "2018-11-19 12:00",
          end: "2018-11-19 14:00",
          title: "LUNCH",
          class: "lunch",
          background: true,
        },
        {
          start: "2018-11-20 12:00",
          end: "2018-11-20 14:00",
          title: "LUNCH",
          class: "lunch",
          background: true,
        },
      ],
      showEventCreationDialog: false,
      eventsCssClasses: ["type-1", "type-2", "type-3"],
    };
  },
  created() {
    this.fetchSchedule();
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
              let startIsFirstIndex = false;

              defaultNum = this.convertToNumber(listSchedules[0]?.dayInWeek);
              nextNum = this.convertToNumber(listSchedules[1]?.dayInWeek);

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

          // this.scheduleFilter = finalData;
          this.fData = finalData;
          // this.isLoad = true;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    onEventCreate(event, deleteEventFunction) {
      this.selectedEvent = event;
      this.deleteEventFunction = deleteEventFunction;

      return event;
    },
    handleClickEvent(data) {
      this.$emit("handleClickEvent", data);
    },
    cancelEventCreation() {
      this.closeCreationDialog();
      this.deleteEventFunction();
    },
    closeCreationDialog() {
      this.showEventCreationDialog = false;
      this.selectedEvent = {
        title: "",
        content: "",
        start: "",
        end: "",
        class: "type-1",
        background: false,
      };
    },
    changeBgColor(event) {
      this.selectedEvent.class = event.target.value;
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
  },
};
</script>

<style>
.bg-fog {
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.type-1 {
  background-color: #fdab5e !important;
  color: white !important;
}
.type-2 {
  background-color: #ff7d7d !important;
  color: #fff !important;
}
.type-3 {
  background-color: #5ec395 !important;
  color: #fff !important;
}

.vuecal--month-view .vuecal__cell {
  height: 150px;
}
</style>
