<template>
  <div class="w-full">
    <p class="page-sub-title">Danh sách trẻ</p>
    <!-- <div class="grid grid-cols-12 gap-4">
            <div v-for="item in listCourse" class="col-span-12 md:col-span-4">
                <CourseCard :item="item" />
            </div>
        </div>
        <div class="w-full mx-auto mt-5 md:w-[60%]">
            <Pagination />
        </div> -->

    <div class="w-full">
      <div class="grid gap-4 grid-cols-12 mt-5">
        <div
          v-for="child in childrenData"
          class="col-span-12 md:col-span-6 lg:col-span-4 rounded-lg overflow-hidden hover:shadow-2xl cursor-pointer"
        >
          <ChildrenCard
            :child="child"
            @handle-edit="handleEdit"
            @handle-get-detail="handleGetDetail"
          />
        </div>
      </div>

      <div class="w-full mt-5 h-[500px]" v-show="isShowUniqueData">
        đây là data khi vô detail
      </div>
    </div>
  </div>
</template>
<script>
import CourseCard from "../CourseCard.vue";
import Pagination from "../Pagination.vue";
import ChildrenCard from "../../components/ChildrenCard.vue";
import API_USER from "../../API/API_USER";
import { useSystemStore } from "../../stores/system";
import { useAuthStore } from "../../stores/Auth";
export default {
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  props: {},
  components: {
    CourseCard,
    Pagination,
    ChildrenCard,
  },
  data() {
    return {
      childrenData: [],
      isShowUniqueData: false,
    };
  },
  created() {
    this.fetchChildren();
  },
  methods: {
    fetchChildren() {
      this.systemStore.setChangeLoading(true);
      API_USER.getChildrenByParent(this.authStore.getAuth?.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.childrenData = res.data;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    handleEdit(child) {
      console.log(child);
    },
    handleGetDetail(child) {
      this.isShowUniqueData = true;
      this.$nextTick(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
    },
  },
};
</script>
<style scoped>
.br-cus {
  border: 1px solid rgb(213, 213, 213);
}
</style>
