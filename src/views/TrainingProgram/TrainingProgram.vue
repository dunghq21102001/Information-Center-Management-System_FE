<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="data"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        :is-expand="true"
        :is-multi-select="true"
        :is-buy="true"
        is-add="training-program-create"
        @show-form="checkShowForm"
      />
    </div>

    <div @click.self="isShowForm = false" class="fog" v-show="isShowForm">
      <div class="bg-white rounded-lg w-[95%] md:w-[80%] lg:w-[50%] p-4">
        <span class="block text-[20px] lg:text-[24px]">
          Select Discount Code
        </span>
        <select class="px-3 py-1 mt-3 w-[150px]">
          <option selected value="">none</option>
          <option value="">TET40</option>
          <option value="">TET50</option>
          <option value="">TET60</option>
          <option value="">NEW10000</option>
          <option value="">FULL500000</option>
        </select>

        <div class="w-full flex items-start justify-between flex-wrap">
          <div class="w-[50%]">
            <span class="block text-[20px] lg:text-[24px] mt-5">
              Select A Payment Method
            </span>
            <select class="px-3 py-1 mt-3 w-[150px]">
              <option value="">Cash</option>
              <option value="">Bank Transfer</option>
              <option value="">Electronic Wallet</option>
            </select>
          </div>

          <div class="w-[50%]">
            <span class="block text-[20px] lg:text-[24px] mt-5">
              Select A Payment Type
            </span>
            <select class="px-3 py-1 mt-3 w-[150px]">
              <option value="">Pay All</option>
              <option value="">Installment</option>
            </select>
          </div>
        </div>

        <div class="w-full flex items-center justify-start mt-5">
          <button @click="isShowForm = false" class="px-3 py-1 btn-cancel">
            Cancel
          </button>
          <button class="px-3 py-1 btn-primary ml-3" @click="payment">
            Save
          </button>
        </div>
      </div>
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
      header: tableConfig.trainingProgramTable(),
      isShowForm: false,
      data: [
        {
          trainingProgramCode: "JS1049",
          price: 29520100,
          name: "Khoá học lập trình javascript cơ bản",
          image:
            "https://www.classcentral.com/report/wp-content/uploads/2022/06/JavaScript-BCG-Banner-icons.png",
        },
        {
          trainingProgramCode: "JS1049",
          price: 29520100,
          name: "Khoá học lập trình javascript cơ bản",
          image:
            "https://www.classcentral.com/report/wp-content/uploads/2022/06/JavaScript-BCG-Banner-icons.png",
        },
        {
          trainingProgramCode: "JS1049",
          price: 29520100,
          name: "Khoá học lập trình javascript cơ bản",
          image:
            "https://www.classcentral.com/report/wp-content/uploads/2022/06/JavaScript-BCG-Banner-icons.png",
        },
        {
          trainingProgramCode: "JS1049",
          price: 29520100,
          name: "Khoá học lập trình javascript cơ bản",
          image:
            "https://www.classcentral.com/report/wp-content/uploads/2022/06/JavaScript-BCG-Banner-icons.png",
        },
      ],
    };
  },
  created() {},
  methods: {
    checkShowForm(isShowForm) {
      this.isShowForm = isShowForm;
    },
    payment() {
      window.open(
        "https://sandbox.vnpayment.vn/paymentv2/Transaction/PaymentMethod.html?token=3349400e691e4b4c8dd0b514cc9aaaa9",
        "_blank"
      );
    },
  },
};
</script>
<style scoped>
.fog {
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 70;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
