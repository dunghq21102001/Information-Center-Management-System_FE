<template>
  <div class="w-full">
    <Calendar :events="dataFetch" :is-permission="isPermission" />
  </div>
</template>
<script>
import API_SCHEDULE from "../../API/API_SCHEDULE";
import Calendar from "../../components/Calendar.vue";
import { useAuthStore } from "../../stores/Auth";
import { useSystemStore } from "../../stores/system";

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
        title: true,
        drag: true,
        resize: true,
        delete: true,
        create: true,
      },
      dataFetch: [
        {
          start: "2024-1-14 11:30",
          end: "2024-1-15 12:30",
          title: "Need to go shopping",
          content: '<i class="icon material-icons">shopping_cart</i>',
          class: "type-1",
        },
        {
          start: "2024-1-16 12:30",
          end: "2024-1-16 12:50",
          title: "Golf with John",
          content: '<i class="icon material-icons">golf_course</i>',
          class: "type-2",
        },
        {
          start: "2024-12-17 12:30",
          end: "2024-12-17 13:40",
          title: "Dad's birthday!",
          content: '<i class="icon material-icons">cake</i>',
          class: "type-2",
        },
      ],
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
          this.scheduleData = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
  },
};
</script>
