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
export default {
  props: {},
  components: {
    CourseCard,
    Pagination,
    ChildrenCard,
  },
  data() {
    return {
      childrenData: [
        {
          id: 1,
          name: "Nguyen Thi Tran Anh Van A",
          image:
            "https://ataxavi.vn/wp-content/uploads/2023/07/f637b0052729d9502ff03abe390fe051.jpg",
          age: 12,
        },
        {
          id: 2,
          name: "Nguyen Thi C",
          image:
            "https://ataxavi.vn/wp-content/uploads/2023/07/9ddcc1a2bffbd09d55a52a0d9e880266.jpg",
          age: 10,
        },
        {
          id: 3,
          name: "Nguyen Thi D",
          image:
            "https://ataxavi.vn/wp-content/uploads/2023/07/f637b0052729d9502ff03abe390fe051.jpg",
          age: 14,
        },
        {
          id: 4,
          name: "Nguyen Thanh E",
          image:
            "https://i.pinimg.com/736x/ca/5a/cc/ca5acc025626d8ee7a17fcca3cfc0b08.jpg",
          age: 14,
        },
      ],
      isShowUniqueData: false,
    };
  },
  created() {
    this.fetchChildren();
  },
  methods: {
    fetchChildren() {},
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
