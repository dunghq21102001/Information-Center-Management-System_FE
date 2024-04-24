<template>
  <div class="w-full">
    <FormSchema
      v-if="fetchCount == 2"
      :schema="schema"
      btn-name="Tạo"
      page-title="Tạo lớp học"
      @form-submitted="handleAddClass"
    />
  </div>
</template>
<script>
import func from "../../common/func";
import { useSystemStore } from "../../stores/System";
import schemaConfig from "../../common/config/schemaConfig";
import swal from "../../common/swal";
import FormSchema from "../../components/FormSchema.vue";
import API_CLASS from "../../API/API_CLASS";
import API_COURSE from "../../API/API_COURSE";
import API_SEMESTER from "../../API/API_SEMESTER";
import API_SLOT from "../../API/API_SLOT";
import dayjs from "dayjs";

export default {
  components: {
    FormSchema,
  },
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  data() {
    return {
      schema: schemaConfig.classSchema(),
      courses: [],
      semesters: [],
      fetchCount: 0,
      slots: [],
      dayInWeek: [
        // { id: "Monday", name: "Monday" },
        // { id: "Tuesday", name: "Tuesday" },
        // { id: "Wednesday", name: "Wednesday" },
        // { id: "Thursday", name: "Thursday" },
        // { id: "Friday", name: "Friday" },
        // { id: "Saturday", name: "Saturday" },
        // { id: "Sunday", name: "Sunday" },
        { id: "Tuesday,Friday", name: "Thứ 3, Thứ 6" },
        { id: "Wednesday,Saturday", name: "Thứ 4, Thứ 7" },
        { id: "Thursday,Sunday", name: "Thứ 5, Chủ nhật" },
      ],
    };
  },
  watch: {
    fetchCount() {
      if (this.fetchCount == 2) {
        this.schema = schemaConfig.classSchema(
          this.courses,
          this.slots,
          this.dayInWeek
        );
      }
    },
  },
  created() {
    this.fetchCourse();
    // this.fetchSemester();
    this.fetchSlot();
  },
  methods: {
    handleAddClass(data) {
      if (data?.dayInWeek.length == 0 || data?.dayInWeek.length == 1)
        return swal.error("Bạn phải chọn 2 thứ trong 1 tuần");
      if (data?.dayInWeek.length > 2)
        return swal.error("Bạn chỉ có thể chọn 2 thứ trong 1 tuần");

      let cloneDayInWeek = func.cloneArray(data.dayInWeek);
      let finalDayInWeek = [];
      if (this.convertToNumber(cloneDayInWeek[0]) == 0) {
        finalDayInWeek.push(cloneDayInWeek[1]);
        finalDayInWeek.push(cloneDayInWeek[0]);
      } else if (this.convertToNumber(cloneDayInWeek[1]) == 0) {
        finalDayInWeek.push(cloneDayInWeek[0]);
        finalDayInWeek.push(cloneDayInWeek[1]);
      } else if (
        this.convertToNumber(cloneDayInWeek[0]) >
        this.convertToNumber(cloneDayInWeek[1])
      ) {
        finalDayInWeek.push(cloneDayInWeek[1]);
        finalDayInWeek.push(cloneDayInWeek[0]);
      } else {
        finalDayInWeek.push(cloneDayInWeek[0]);
        finalDayInWeek.push(cloneDayInWeek[1]);
      }

      data["dayInWeek"] = finalDayInWeek;

      this.systemStore.setChangeLoading(true);

      const slotItem = this.slots.find((item) => {
        if (item?.id == data?.slotId) return item;
      });

      const formattedDate = dayjs(data?.startDate, "MM/DD/YYYY").format(
        "YYYY-MM-DD"
      );

      const startTime = formattedDate + "T" + slotItem?.startTime;
      const endTime = formattedDate + "T" + slotItem?.endTime;

      // let fDayInWeek = data.dayInWeek.split(",");

      let finalDay = [];
      data?.dayInWeek.map((item) => {
        finalDay.push({
          classId: null,
          slotId: data?.slotId,
          startDate: formattedDate,
          dayInWeek: item,
          startTime: startTime,
          endTime: endTime,
        });
      });

      API_CLASS.postClass({
        courseId: data?.courseId,
        classCode: data?.classCode,
        startDate: data?.startDate,
        endDate: data?.endDate,
        maxNumber: data?.maxNumber,
        expectedNumber: data?.expectedNumber,
        createScheduleViewModel: finalDay,
      })
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.$router.push({ name: "classes" });
        })
        .catch((err) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchSemester() {
      this.systemStore.setChangeLoading(true);
      API_SEMESTER.getSemesters()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.semesters = res.data;
          this.fetchCount++;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchCourse() {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getSingleCourse()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.courses = res.data;
          this.fetchCount++;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchSlot() {
      this.systemStore.setChangeLoading(true);
      API_SLOT.getSlots()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          let tmpD = [];
          res.data.map((item) => {
            if (item?.slotType == 1) tmpD.push(item);
          });
          this.slots = tmpD.sort();
          this.fetchCount++;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
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
<style scoped></style>
