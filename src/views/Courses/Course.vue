<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="data"
        :header="header"
        is-show-search="false"
        :is-update="true"
        :is-delete="true"
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
          name: "ok ok",
          description: "des ok",
          image: "https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg",
          totalSlot: "8",
        },
        {
          name: "ok ok",
          description: "des ok",
          image: "https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg",
          totalSlot: "8",
        },
        {
          name: "ok ok",
          description: "des ok",
          image: "https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg",
          totalSlot: "8",
        },
        {
          name: "ok ok",
          description: "des ok",
          image: "https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg",
          totalSlot: "8",
        },
        {
          name: "ok ok",
          description: "des ok",
          image: "https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg",
          totalSlot: "8",
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
