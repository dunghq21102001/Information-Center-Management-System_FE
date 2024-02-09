<template>
  <div class="w-full my-5">
    <div class="flex items-center justify-between w-full mb-4">
      <div v-show="isShowSearch" class="w-full flex items-center">
        <select
          class="bor-no-r px-2 h-[40px] outline-none"
          v-model="selectedField"
        >
          <option
            v-for="item in headerProp"
            :value="item.value"
            v-show="item?.text != 'Action'"
          >
            {{ item.text }}
          </option>
        </select>
        <input
          v-model="searchQuery"
          placeholder="search . . ."
          class="w-[180px] md:w-[400px] bor-no-l px-3 outline-none h-[40px]"
          type="text"
        />
      </div>
      <button
        v-if="isBuyProp"
        class="btn-primary w-[120px] h-[40px]"
        :class="itemsSelected.length > 0 ? 'block' : 'hidden'"
        @click="showFormBuying"
      >
        Buy now
      </button>
    </div>
    <div class="w-full flex items-center justify-center">
      <!-- v-model:items-selected="itemsSelected" không có multi select-->
      <EasyDataTable
        v-if="isMultiSelectProp == false"
        table-class-name="customize-table"
        theme-color="#007d88"
        :headers="headerProp"
        buttons-pagination
        :items="dataProp"
        show-index
        :search-field="selectedField"
        :search-value="searchQuery"
      >
        <template #item-image="item">
          <div class="w-[100px] h-[100px] overflow-hidden flex items-center">
            <img :src="item?.image" class="w-full object-fill" alt="user image" />
          </div>
        </template>
        <template #item-avatar="item">
          <div class="w-[100px] h-[100px] overflow-hidden flex items-center">
            <img :src="item?.avatar" class="w-full object-fill" alt="user image" />
          </div>
        </template>
        <template #item-price="item">
          <span class="block">
            {{ convertToVND(item?.price) }}
          </span>
        </template>
        <template #item-syllabus="item">
          <div class="">
            <span class="hover:underline text-blue-500 cursor-pointer">
              Syllabus
            </span>
          </div>
        </template>
        <template #item-operation="item">
          <div class="operation-wrapper flex items-center">
            <!-- <button
              title="Register code for children"
              v-if="isRegisterCourseProp"
              class="mr-3"
            >
              <v-icon
              @click="goToVNPay"
               name="bi-cart-plus-fill" :scale="1.5" fill="#38676f" />
            </button> -->
            <button title="Edit" v-if="isUpdateProp" class="mr-3">
              <v-icon
                @click="actionEdit(item)"
                name="fa-regular-edit"
                :scale="1.5"
                fill="#2ae549"
              />
            </button>
            <button title="Delete" v-if="isDeleteProp">
              <v-icon name="md-delete" :scale="1.5" fill="#e71c1c" />
            </button>
          </div>
        </template>
      </EasyDataTable>

      <!-- v-model:items-selected="itemsSelected" có multi select-->
      <EasyDataTable
        v-else
        table-class-name="customize-table"
        theme-color="#007d88"
        :headers="headerProp"
        buttons-pagination
        :items="dataProp"
        show-index
        :search-field="selectedField"
        :search-value="searchQuery"
        v-model:items-selected="itemsSelected"
      >
        <template #item-image="item">
          <div class="w-[100px] h-[100px] overflow-hidden flex items-center">
            <img :src="item?.image" class="w-full object-fill" alt="user image" />
          </div>
        </template>
        <template #item-avatar="item">
          <div class="w-[100px] h-[100px] overflow-hidden flex items-center">
            <img :src="item?.avatar" class="w-full object-fill" alt="user image" />
          </div>
        </template>
        <template #item-price="item">
          <span class="block">
            {{ convertToVND(item?.price) }}
          </span>
        </template>
        <template #item-syllabus="item">
          <div class="">
            <span class="hover:underline text-blue-500 cursor-pointer">
              Syllabus
            </span>
          </div>
        </template>
        <template #expand="item" v-if="isExpandProp">
          <div class="w-full mx-auto">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="child in test">
                  <td>
                    <div class="w-[30px]">
                      <input type="checkbox" class="sizing" />
                    </div>
                  </td>
                  <td>{{ child.code }}</td>
                  <td>{{ child.name }}</td>
                  <td>{{ child.price }}</td>
                  <td>{{ child.Level }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
        <template #item-operation="item">
          <div class="operation-wrapper flex items-center">
            <button title="Edit" v-if="isUpdateProp" class="mr-3">
              <v-icon
                @click="actionEdit(item)"
                name="fa-regular-edit"
                :scale="1.5"
                fill="#2ae549"
              />
            </button>
            <button title="Delete" v-if="isDeleteProp">
              <v-icon name="md-delete" :scale="1.5" fill="#e71c1c" />
            </button>
          </div>
        </template>
      </EasyDataTable>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import func from "../common/func";
export default {
  props: {
    data: {
      type: Array,
      default: [],
    },
    header: {
      type: Array,
      default: [],
    },
    isShowSearch: {
      type: Boolean,
      default: false,
    },
    isDelete: Boolean,
    isUpdate: Boolean,
    isExpand: {
      type: Boolean,
      default: false,
    },
    isMultiSelect: {
      type: Boolean,
      default: false,
    },
    isBuy: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // Tạo biến reactive cho dataProp
    const dataProp = ref(props.data);


    // Watch sự thay đổi của prop 'data' và cập nhật dataProp
    watch(
      () => props.data,
      (newValue) => {
        dataProp.value = newValue;
      }
    );

    return {
      dataProp,
    };
  },
  data() {
    return {
      // dataProp: this.data,
      headerProp: this.header,
      isUpdateProp: this.isUpdate,
      isDeleteProp: this.isDelete,
      isExpandProp: this.isExpand,
      isBuyProp: this.isBuy,
      isMultiSelectProp: this.isMultiSelect,

      searchQuery: "",
      selectedField: "",
      isShowEdit: false,
      itemsSelected: ["niwfiwfnfn"],
      test: [
        {
          code: "AI40",
          name: "Khoá học FullStack cấp tốc cơ bản",
          price: "5.000.000VND",
          Level: "Easy",
        },
        {
          code: "AI40",
          name: "Khoá học Robotic",
          price: "6.000.000VND",
          Level: "Medium",
        },
        {
          code: "ZQ21",
          name: "Khoá học Database cấp tốc nâng cao 1",
          price: "7.000.000VND",
          Level: "Hard",
        },
        {
          code: "KW41",
          name: "Khoá học Database cấp tốc nâng cao 2",
          price: "9.000.000VND",
          Level: "Hard",
        },
      ],
    };
  },
  created() {
    this.selectedField = this.headerProp[0]?.value || "";
  },
  methods: {
    actionEdit(id) {
      console.log(id);
      this.$router.push({ name: "user-update", params: { id: id.number } });
    },
    convertToVND(price) {
      return func.convertVND(price);
    },
    goToVNPay() {
      window.open(
        "  http://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder",
        "_blank"
      );
    },
    showFormBuying() {
      this.$emit("showForm", true);
    },
  },
};
</script>
<style scoped>
.customize-table {
  width: 100%;
  /* --easy-table-border: 1px solid #445269; */
  /* --easy-table-row-border: 1px solid #445269; */

  --easy-table-header-font-size: 16px;
  --easy-table-header-height: 50px;
  /* --easy-table-header-font-color: #c1cad4; */
  /* --easy-table-header-background-color: #2d3a4f; */

  --easy-table-header-item-padding: 10px 15px;

  /* --easy-table-body-even-row-font-color: #fff; */
  /* --easy-table-body-even-row-background-color: #4c5d7a; */

  /* --easy-table-body-row-font-color: #c0c7d2; */
  /* --easy-table-body-row-background-color: #2d3a4f; */
  --easy-table-body-row-height: 30px;
  --easy-table-body-row-font-size: 14px;

  /* --easy-table-body-row-hover-font-color: #2d3a4f; */
  /* --easy-table-body-row-hover-background-color: #eee; */

  --easy-table-body-item-padding: 10px 15px;

  /* --easy-table-footer-background-color: #2d3a4f;
    --easy-table-footer-font-color: #c0c7d2;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px; */

  --easy-table-rows-per-page-selector-width: 70px;
  /* --easy-table-rows-per-page-selector-option-padding: 10px; */
  /* --easy-table-rows-per-page-selector-z-index: 1; */

  /* --easy-table-scrollbar-track-color: #2d3a4f; */
  /* --easy-table-scrollbar-color: #2d3a4f; */
  /* --easy-table-scrollbar-thumb-color: #4c5d7a; */
  /* --easy-table-scrollbar-corner-color: #2d3a4f; */

  /* --easy-table-loading-mask-background-color: #2d3a4f; */
}

.bor-cus {
  border: 1px solid rgb(227, 227, 227);
}

.bor-no-r {
  border-top: 1px solid rgb(227, 227, 227);
  border-left: 1px solid rgb(227, 227, 227);
  border-bottom: 1px solid rgb(227, 227, 227);
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.bor-no-l {
  border-top: 1px solid rgb(227, 227, 227);
  border-right: 1px solid rgb(227, 227, 227);
  border-bottom: 1px solid rgb(227, 227, 227);
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}

.sizing {
  -ms-transform: scale(1.2); /* IE */
  -moz-transform: scale(1.2); /* FF */
  -webkit-transform: scale(1.2); /* Safari and Chrome */
  -o-transform: scale(1.2); /* Opera */
  transform: scale(1.2);
}

table {
  border-collapse: separate;
  border-spacing: 15px; /* Điều chỉnh giá trị này để tăng hoặc giảm khoảng cách giữa các ô */
}

th {
  text-align: left;
  padding: 0 10px 0 0;
}
th,
td {
  min-width: 30px;
}
</style>
