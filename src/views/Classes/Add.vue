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
      this.systemStore.setChangeLoading(true);

      const slotItem = this.slots.find((item) => {
        if (item?.id == data?.slotId) return item;
      });

      const formattedDate = dayjs(data?.startDate, "MM/DD/YYYY").format(
        "YYYY-MM-DD"
      );

      const startTime = formattedDate + "T" + slotItem?.startTime;
      const endTime = formattedDate + "T" + slotItem?.endTime;

      let fDayInWeek = data.dayInWeek.split(",");

      let finalDay = [];
      fDayInWeek.map((item) => {
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
  },
};
</script>
<style scoped></style>
