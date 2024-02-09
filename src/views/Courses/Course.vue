<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="data"
        :header="header"
        is-show-search="false"
        :is-update="true"
        :is-delete="true"
        :is-expand="true"
      />
    </div>
  </div>
</template>
<script>
import tableConfig from "../../common/config/tableConfig";
import NormalTable from "../../components/NormalTable.vue";
export default {
  setup() {},
  components: { NormalTable },
  data() {
    return {
      header: tableConfig.courseTable(),
      data: [
        {
          courseCode: "JS1049",
          price: 29520100,
          name: "Khoá học lập trình javascript cơ bản",
          image:
            "https://www.classcentral.com/report/wp-content/uploads/2022/06/JavaScript-BCG-Banner-icons.png",
          description: "Khoá học cơ bản",
          durationTotal: "10",
          syllabus: "",
          discount: "15%",
          level: "Hard",
          entryPoint: "40",
        },
        {
          courseCode: "JS1049",
          price: 29520100,
          name: "Khoá học lập trình javascript cơ bản",
          image:
            "https://www.classcentral.com/report/wp-content/uploads/2022/06/JavaScript-BCG-Banner-icons.png",
          description: "Khoá học cơ bản",
          durationTotal: "23",
          syllabus: "",
          discount: "10%",
          level: "Hard",
          entryPoint: "20",
        },
        {
          courseCode: "JS1049",
          price: 29520100,
          name: "Khoá học lập trình javascript cơ bản",
          image:
            "https://www.classcentral.com/report/wp-content/uploads/2022/06/JavaScript-BCG-Banner-icons.png",
          description: "Khoá học cơ bản",
          durationTotal: "20",
          syllabus: "",
          discount: "35%",
          level: "Hard",
          entryPoint: "30",
        },
        {
          courseCode: "JS1049",
          price: 29520100,
          name: "Khoá học lập trình javascript cơ bản",
          image:
            "https://www.classcentral.com/report/wp-content/uploads/2022/06/JavaScript-BCG-Banner-icons.png",
          description: "Khoá học cơ bản",
          durationTotal: "18",
          syllabus: "",
          discount: "25%",
          level: "Hard",
          entryPoint: "60",
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
