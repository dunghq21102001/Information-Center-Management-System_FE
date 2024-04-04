<template>
  <div class="w-full">
    <div class="w-full">
      <div class="w-full flex items-center justify-between">
        <div class="w-full flex flex-wrap items-center">
          <span
            @click="$router.push({ name: 'classes' })"
            class="text-[28px] font-bold block text-gray-700 hv-t"
          >
            Danh sách lớp
          </span>
          <v-icon scale="1.5" name="md-keyboardarrowright" />
          <span class="text-[28px] font-bold block text-gray-700 hv-t">
            Quản lý lớp
          </span>
        </div>
        <button class="btn-primary px-3 py-1 w-[250px]" @click="isShowEnrollment = true">
          Thêm trẻ vào lớp
        </button>
      </div>

      <!-- <div class="w-full">
      
      </div> -->

      <div class="w-[90%] mx-auto">
        <NormalTable
          :data="childrenInClass"
          :header="header"
          :is-show-search="true"
          excel="children-in-class-data"
          csv="children-in-class-data"
          :reload="true"
          @reload-action="reloadList"
        />
      </div>

      <div
        v-if="isShowEnrollment"
        @click.self="isShowEnrollment = false"
        class="bg-fog-tb flex justify-end"
      >
        <div
          class="bg-white w-[90%] md:w-[60%] lg:w-[40%] h-screen overflow-y-scroll p-4"
        >
          <div
            class="absolute top-5 w-[30px] h-[30px] flex items-center justify-center right-5 text-[25px] cursor-pointer hover:bg-red-500 hover:rounded-full"
          >
            <v-icon
              @click="isShowEnrollment = false"
              name="io-close-outline"
              scale="1.5"
            />
          </div>
          <FormList
            :data-list="childrenData"
            title="Ghi danh học sinh vào lớp"
            @handle-submit-list="enrollmentChildren"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API_CLASS from "../../API/API_CLASS";
import API_USER from "../../API/API_USER.js";
import API_ENROLLMENT from "../../API/API_ENROLLMENT.js";
import { useAuthStore } from "../../stores/Auth.js";
import { useSystemStore } from "../../stores/System.js";
import tableConfig from "../../common/config/tableConfig.js";
import NormalTable from "../../components/NormalTable.vue";
import FormList from "../../components/FormList.vue";
import swal from "../../common/swal.js";
export default {
  components: { NormalTable, FormList },
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  data() {
    return {
      classDetail: null,
      childrenData: [],
      childrenInClass: [],
      header: tableConfig.childrenInClassTable(),
      isShowEnrollment: false,
    };
  },
  created() {
    this.fetchDetail(this.$route.params.id);
    this.getListChildrenByStaff();
    this.getChildrenByClass(this.$route.params.id);
  },
  methods: {
    fetchDetail(id) {
      this.systemStore.setChangeLoading(true);
      API_CLASS.getClassById(id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.classDetail = res.data;
        })
        .catch((err) => {
          this.$router.push({ name: "not-found", params: { catchAll: "404" } });
          this.systemStore.setChangeLoading(false);
        });
    },
    getChildrenByClass(id) {
      this.systemStore.setChangeLoading(true);
      API_CLASS.getChildrenByClassId(id)
        .then((res) => {
          this.childrenInClass = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    getListChildrenByStaff() {
      if (this.authStore.getAuth?.roleName == "Staff") {
        this.systemStore.setChangeLoading(true);
        API_USER.getChildrenByStaff()
          .then((res) => {
            this.childrenData = res.data;
            this.systemStore.setChangeLoading(false);
          })
          .catch((err) => this.systemStore.setChangeLoading(false));
      }
    },
    enrollmentChildren(item) {
      console.log(item);
      let tmp = [];
      item.map((i) => {
        if (i?.select == true)
          tmp.push({
            classId: this.$route.params.id,
            childrenProfileId: i?.id,
          });
      });
      this.systemStore.setChangeLoading(true);
      API_ENROLLMENT.postEnrollment(tmp)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.getChildrenByClass(this.$route.params.id);
          swal.success("Thêm trẻ vào lớp thành công");
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err.response?.data, 4000);
        });
    },
    reloadList() {
      this.getChildrenByClass(this.$route.params.id);
    },
  },
};
</script>
<style scoped>
.bg-fog-tb {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
}
</style>
