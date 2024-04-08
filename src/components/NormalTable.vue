<template>
  <div class="w-full my-5">
    <div
      class="flex items-start justify-between w-full mb-4 flex-wrap md:flex-nowrap"
    >
      <div
        v-show="isShowSearch"
        class="w-full lg:w-[400px] mt-3 flex items-center"
      >
        <select
          class="bor-no-r px-2 h-[40px] outline-none"
          v-model="selectedField"
        >
          <option
            v-for="item in searchList"
            :value="item.value"
            v-show="item?.text != 'Action'"
          >
            {{ item.text }}
          </option>
        </select>
        <input
          v-model="searchQuery"
          placeholder="Tìm kiếm . . ."
          class="w-full lg:w-[400px] bor-no-l px-3 outline-none h-[40px]"
          type="text"
        />
      </div>
      <div class="flex items-center flex-wrap justify-end">
        <div v-if="reloadProp" class="h-[40px] mt-3 cursor-pointer mr-1">
          <v-icon
            v-tooltip="'Tải lại dữ liệu'"
            @click="reloadAction"
            name="co-reload"
            scale="2"
          />
        </div>
        <div v-if="isImportData" class="h-[40px] mt-3 cursor-pointer mr-1">
          <v-icon
            v-tooltip="'Nhập dữ liệu từ tệp Excel'"
            @click="handleImportData"
            name="fa-file-import"
            scale="2"
            fill="#3398db"
          />
        </div>

        <div
          v-if="excelProp != '' && excelCustom == false"
          class="h-[40px] mt-3 cursor-pointer mr-1"
        >
          <download-excel
            v-tooltip="'Tải xuống Excel'"
            :data="dataProp"
            :fields="fieldsExport"
            worksheet="Worksheet 1"
            :name="`${excelProp}.xls`"
          >
            <v-icon name="vi-file-type-excel" scale="2" />
          </download-excel>
        </div>
        <div v-if="excelCustom" class="h-[40px] mt-3 cursor-pointer mr-1">
          <v-icon
            name="vi-file-type-excel"
            class="cursor-pointer"
            @click="handleClickExcelCustom"
            scale="2"
          />
        </div>
        <div v-if="csvProp != ''" class="h-[40px] mt-3 cursor-pointer mr-1">
          <download-excel
            v-tooltip="'Tải xuống CSV'"
            :data="dataProp"
            :fields="fieldsExport"
            worksheet="Worksheet 1"
            type="csv"
            :name="`${csvProp}.csv`"
          >
            <v-icon name="la-file-csv-solid" scale="2" fill="#08774e" />
          </download-excel>
        </div>
        <button
          v-if="isBuyProp && authStore.getAuth?.roleName == 'Staff'"
          class="btn-primary w-[120px] h-[40px] mt-3 mx-1"
          :class="itemsSelected.length > 0 ? 'block' : 'hidden'"
          @click="showFormBuying"
        >
          Mua ngay
        </button>
        <button
          v-if="
            isChangeStatusClasses &&
            (authStore.getAuth?.roleName == 'Admin' ||
              authStore.getAuth?.roleName == 'Manager')
          "
          class="btn-primary w-[120px] h-[40px] mt-3 mx-1"
          :class="itemsSelected.length > 0 ? 'block' : 'hidden'"
          @click="changeStatusOfClasses"
        >
          Đổi trạng thái
        </button>
        <button
          v-if="isChangeStatus && itemsSelected.length > 0"
          class="btn-primary w-[120px] h-[40px] mt-3 mx-1"
          @click="updateStatusAccount"
        >
          Đổi trạng thái
        </button>
        <button
          v-if="isAddSemester"
          class="btn-primary w-[120px] h-[40px] mt-3 mx-1"
          @click="addSemester"
        >
          Thêm Kỳ mới
        </button>
        <button
          v-if="isAddProp != ''"
          class="btn-primary w-[120px] h-[40px] mt-3 mx-1"
          @click="goToAddNew"
        >
          Thêm mới
        </button>
      </div>
    </div>
    <div class="w-full flex items-center justify-center">
      <!-- v-model:items-selected="itemsSelected" không có multi select-->
      <EasyDataTable
        v-if="isMultiSelectProp == false"
        table-class-name="customize-table"
        theme-color="#007d88"
        :headers="headerProp"
        buttons-pagination
        :rows-per-page="4"
        :items="dataProp"
        :search-field="selectedField"
        :search-value="searchQuery"
      >
        <template #item-image="item">
          <div class="w-[100px] h-[100px] overflow-hidden flex items-center">
            <img
              :src="item?.image"
              class="w-full object-cover"
              alt="Ảnh người dùng"
            />
          </div>
        </template>
        <template #item-warrantyDate="item">
          <span class="block">
            {{ convertDate(item?.warrantyDate) }}
          </span>
        </template>
        <template #item-startTime="item">
          <span class="block">
            {{ convertDate(item?.startTime) }}
          </span>
        </template>
        <template #item-registerDate="item">
          <span class="block">
            {{ convertDate(item?.registerDate) }}
          </span>
        </template>
        <template #item-content="item">
          <div class="overflow-hidden flex items-center">
            <div v-html="item?.content"></div>
          </div>
        </template>
        <template #item-actualNumber="item">
          <div class="overflow-hidden flex items-center">
            <span>{{ item.actualNumber }} / {{ item.maxNumber }}</span>
          </div>
        </template>
        <template #item-status="item">
          <div
            v-if="item.status == 'Enable' || item.status == 'Disable'"
            class="border-[1px] text-center border-solid px-3 py-1 rounded-md"
            :class="
              item.status == 'Enable' ? 'border-green-600' : 'border-red-500'
            "
          >
            <span
              class="block"
              :class="
                item.status == 'Enable' ? 'text-green-600' : 'text-red-500'
              "
              >{{ item.status }}</span
            >
          </div>
          <div v-else>
            {{ item.status }}
          </div>
        </template>
        <template #item-avatar="item">
          <div class="w-[100px] h-[100px] overflow-hidden flex items-center">
            <img
              :src="item?.avatar"
              class="w-full object-cover"
              alt="Ảnh người dùng"
            />
          </div>
        </template>
        <template #item-price="item">
          <span class="block">
            {{ convertToVND(item?.price) }}
          </span>
        </template>
        <template #item-totalAmount="item">
          <span class="block">
            {{ convertToVND(item?.totalAmount) }}
          </span>
        </template>
        <template #item-commission="item">
          <span class="block">
            {{ convertToVND(item?.commission) }}
          </span>
        </template>
        <template #item-syllabus="item">
          <div class="">
            <span
              @click="goToSyllabus(item.syllabus)"
              class="hover:underline text-blue-500 cursor-pointer"
            >
              Syllabus
            </span>
          </div>
        </template>
        <template #item-detail="item">
          <div class="">
            <span
              @click="handleGetDetail(item)"
              class="hover:underline text-blue-500 cursor-pointer"
            >
              Chi tiết
            </span>
          </div>
        </template>
        <template #item-dateOfBirth="item">
          <span class="block">
            {{ convertDate(item?.dateOfBirth) }}
          </span>
        </template>
        <template #item-orderDate="item">
          <span class="block">
            {{ convertDate(item?.orderDate) }}
          </span>
        </template>
        <template #item-testDate="item">
          <span class="block">
            {{ convertDate(item?.testDate) }}
          </span>
        </template>
        <template #item-leaveDate="item">
          <span class="block">
            {{ convertDate(item?.leaveDate) }}
          </span>
        </template>
        <template #item-purchaseDate="item">
          <span class="block">
            {{ convertDate(item?.purchaseDate) }}
          </span>
        </template>
        <template #item-genderType="item">
          <div
            class="px-3 py-1 rounded-md flex items-center justify-center border-[1px] border-solid"
            :class="
              item?.genderType == 'Nam' ? 'border-blue-600' : 'border-pink-600'
            "
          >
            <span
              class="block font-bold"
              :class="
                item?.genderType == 'Nam' ? 'text-blue-600' : 'text-pink-600'
              "
            >
              {{ item?.genderType == "Nam" ? "♂️" : "♀️" }}
            </span>
          </div>
        </template>
        <template #item-startDate="item">
          <span class="block">
            {{ convertDate(item?.startDate) }}
          </span>
        </template>
        <template #item-endDate="item">
          <span class="block">
            {{ convertDate(item?.endDate) }}
          </span>
        </template>
        <template #item-creationDate="item">
          <span class="block">
            {{ convertDate(item?.creationDate) }}
          </span>
        </template>
        <template #item-isTested="item">
          <span
            class="block border-[1px] border-solid px-2 py-1 rounded-md text-center"
            :class="
              item.isTested == true
                ? 'border-green-600 text-green-600'
                : 'border-red-500 text-red-500'
            "
          >
            {{ item?.isTested == true ? "Đã thi" : "Chưa thi" }}
          </span>
        </template>
        <template #item-operation="item">
          <div class="operation-wrapper flex items-center justify-start">
            <button
              class="mr-4"
              v-tooltip="'Thêm khoá học con'"
              v-if="isAddChildCourse"
            >
              <v-icon
                name="si-coursera"
                :scale="1.5"
                fill="#0871ba"
                @click="showAddNewCourse(item)"
              />
            </button>
            <button v-tooltip="'Tạo tài khoản'" v-if="isCreateAccount">
              <v-icon
                name="fa-user-plus"
                :scale="1.5"
                fill="#0871ba"
                @click="createAccount(item)"
              />
            </button>
            <button class="mr-4" v-tooltip="dataListTitle" v-if="isAddByList">
              <v-icon
                name="bi-plus-circle"
                :scale="1.5"
                fill="#0871ba"
                @click="showDataList(item)"
              />
            </button>
            <button
              v-tooltip="'Thêm trẻ'"
              v-if="item?.roleName == 'Parent'"
              class="mr-3"
            >
              <v-icon
                @click="addChildren(item)"
                name="md-childcare"
                :scale="1.5"
                fill="#3398db"
              />
            </button>
            <button
              v-tooltip="'Xem danh sách trẻ'"
              v-if="
                item?.roleName == 'Parent' &&
                authStore.getAuth?.roleName == 'Staff'
              "
            >
              <v-icon
                @click="viewChildrenListByParent(item)"
                name="bi-list-ol"
                :scale="1.5"
                fill="#3398db"
              />
            </button>
            <button v-tooltip="'Thanh toán đơn hàng'" class="mr-3">
              <v-icon
                @click="handlePayment(item)"
                v-if="isPaymentProp"
                name="md-payment-round"
                :scale="1.5"
                fill="#3398db"
              />
            </button>
            <button
              class="mr-4"
              v-tooltip="'Nhận tư vấn người dùng'"
              v-if="isReceiveAdviceRequestProp"
            >
              <v-icon
                @click="getAdviceRequest(item)"
                name="bi-hand-index"
                :scale="1.5"
                fill="#0871ba"
              />
            </button>
            <button
              class="mr-4"
              v-tooltip="'Đặt lại mật khẩu'"
              v-if="isResetPassProp"
            >
              <v-icon
                @click="resetPassword(item)"
                name="md-lockreset-outlined"
                :scale="1.5"
                fill="#0871ba"
              />
            </button>
            <button v-tooltip="'Cập nhật'" v-if="isUpdateProp" class="mr-3">
              <v-icon
                @click="editAction(item)"
                name="fa-regular-edit"
                :scale="1.5"
                fill="#2ae549"
              />
            </button>
            <button v-tooltip="'Xoá'" v-if="isDeleteProp">
              <v-icon
                @click="deleteAction(item)"
                name="md-delete"
                :scale="1.5"
                fill="#e71c1c"
              />
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
        :rows-per-page="4"
        :items="dataProp"
        :search-field="selectedField"
        :search-value="searchQuery"
        v-model:items-selected="itemsSelected"
      >
        <template #item-image="item">
          <div class="w-[100px] h-[100px] overflow-hidden flex items-center">
            <img
              :src="item?.image"
              class="w-full object-cover"
              alt="Ảnh người dùng"
            />
          </div>
        </template>
        <template #item-warrantyDate="item">
          <span class="block">
            {{ convertDate(item?.warrantyDate) }}
          </span>
        </template>
        <template #item-startTime="item">
          <span class="block">
            {{ convertDate(item?.startTime) }}
          </span>
        </template>
        <template #item-registerDate="item">
          <span class="block">
            {{ convertDate(item?.registerDate) }}
          </span>
        </template>
        <template #item-content="item">
          <div class="overflow-hidden flex items-center">
            <div v-html="item?.content"></div>
          </div>
        </template>
        <template #item-status="item">
          <div
            class="border-[1px] border-solid text-center px-3 py-1 rounded-md"
            :class="
              item.status == 'Enable' ? 'border-green-600' : 'border-red-500'
            "
          >
            <span
              class="block"
              :class="
                item.status == 'Enable' ? 'text-green-600' : 'text-red-500'
              "
              >{{ item.status }}</span
            >
          </div>
        </template>
        <template #item-avatar="item">
          <div class="w-[100px] h-[100px] overflow-hidden flex items-center">
            <img
              :src="item?.avatar"
              class="w-full object-cover"
              alt="Ảnh người dùng"
            />
          </div>
        </template>
        <template #item-price="item">
          <span class="block">
            {{ convertToVND(item?.price) }}
          </span>
        </template>
        <template #item-totalAmount="item">
          <span class="block">
            {{ convertToVND(item?.totalAmount) }}
          </span>
        </template>
        <template #item-commission="item">
          <span class="block">
            {{ convertToVND(item?.commission) }}
          </span>
        </template>
        <template #item-genderType="item">
          <div
            class="px-3 py-1 rounded-md flex items-center justify-center border-[1px] border-solid"
            :class="
              item?.genderType == 'Nam' ? 'border-blue-600' : 'border-pink-600'
            "
          >
            <span
              class="block font-bold"
              :class="
                item?.genderType == 'Nam' ? 'text-blue-600' : 'text-pink-600'
              "
            >
              {{ item?.genderType == "Nam" ? "♂️" : "♀️" }}
            </span>
          </div>
        </template>
        <template #item-syllabus="item">
          <div class="">
            <span
              @click="goToSyllabus(item.syllabus)"
              class="hover:underline text-blue-500 cursor-pointer"
            >
              Syllabus
            </span>
          </div>
        </template>
        <template #item-detail="item">
          <div class="">
            <span
              @click="handleGetDetail(item)"
              class="hover:underline text-blue-500 cursor-pointer"
            >
              Chi tiết
            </span>
          </div>
        </template>
        <template #item-startDate="item">
          <span class="block">
            {{ convertDate(item?.startDate) }}
          </span>
        </template>
        <template #item-endDate="item">
          <span class="block">
            {{ convertDate(item?.endDate) }}
          </span>
        </template>
        <template #item-creationDate="item">
          <span class="block">
            {{ convertDate(item?.creationDate) }}
          </span>
        </template>
        <template #item-isTested="item">
          <span
            class="block border-[1px] border-solid px-1 py-1 rounded-md text-center"
            :class="
              item.isTested == true
                ? 'border-green-600 text-green-600'
                : 'border-red-500 text-red-500'
            "
          >
            {{ item?.isTested == true ? "Đã thi" : "Chưa thi" }}
          </span>
        </template>
        <template #item-dateOfBirth="item">
          <span class="block">
            {{ convertDate(item?.dateOfBirth) }}
          </span>
        </template>
        <template #item-orderDate="item">
          <span class="block">
            {{ convertDate(item?.orderDate) }}
          </span>
        </template>
        <template #item-testDate="item">
          <span class="block">
            {{ convertDate(item?.testDate) }}
          </span>
        </template>
        <template #item-leaveDate="item">
          <span class="block">
            {{ convertDate(item?.leaveDate) }}
          </span>
        </template>
        <template #item-purchaseDate="item">
          <span class="block">
            {{ convertDate(item?.purchaseDate) }}
          </span>
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
          <div class="operation-wrapper flex items-center justify-start">
            <button
              class="mr-4"
              v-tooltip="'Thêm khoá học con'"
              v-if="isAddChildCourse"
            >
              <v-icon
                name="si-coursera"
                :scale="1.5"
                fill="#0871ba"
                @click="showAddNewCourse(item)"
              />
            </button>
            <button v-tooltip="'Tạo tài khoản'" v-if="isCreateAccount">
              <v-icon
                name="fa-user-plus"
                :scale="1.5"
                fill="#0871ba"
                @click="createAccount(item)"
              />
            </button>
            <button class="mr-4" :title="dataListTitle" v-if="isAddByList">
              <v-icon
                name="bi-plus-circle"
                :scale="1.5"
                fill="#0871ba"
                @click="showDataList(item)"
              />
            </button>
            <button
              v-tooltip="'Thêm trẻ'"
              v-if="item?.roleName == 'Parent'"
              class="mr-3"
            >
              <v-icon
                @click="addChildren(item)"
                name="md-childcare"
                :scale="1.5"
                fill="#3398db"
              />
            </button>
            <button
              v-tooltip="'Xem danh sách trẻ'"
              v-if="
                item?.roleName == 'Parent' &&
                authStore.getAuth?.roleName == 'Staff'
              "
            >
              <v-icon
                @click="viewChildrenListByParent(item)"
                name="bi-list-ol"
                :scale="1.5"
                fill="#3398db"
              />
            </button>
            <button v-tooltip="'Thanh toán đơn hàng'" class="mr-3">
              <v-icon
                @click="handlePayment(item)"
                name="md-payment-round"
                v-if="isPaymentProp"
                :scale="1.5"
                fill="#3398db"
              />
            </button>
            <button
              class="mr-4"
              v-tooltip="'Nhận tư vấn người dùng'"
              v-if="isReceiveAdviceRequestProp"
            >
              <v-icon
                @click="getAdviceRequest(item)"
                name="bi-hand-index"
                :scale="1.5"
                fill="#0871ba"
              />
            </button>
            <button
              class="mr-4"
              v-tooltip="'Đặt lại mật khẩu'"
              v-if="isResetPassProp"
            >
              <v-icon
                @click="resetPassword(item)"
                name="md-lockreset-outlined"
                :scale="1.5"
                fill="#0871ba"
              />
            </button>
            <button v-tooltip="'Cập nhật'" v-if="isUpdateProp" class="mr-3">
              <v-icon
                @click="editAction(item)"
                name="fa-regular-edit"
                :scale="1.5"
                fill="#2ae549"
              />
            </button>
            <button v-tooltip="'Xoá'" v-if="isDeleteProp">
              <v-icon
                @click="deleteAction(item)"
                name="md-delete"
                :scale="1.5"
                fill="#e71c1c"
              />
            </button>
          </div>
        </template>
      </EasyDataTable>
    </div>

    <!-- edit component -->
    <div
      v-if="isShowEdit"
      @click.self="isShowEdit = false"
      class="bg-fog-tb flex justify-end"
    >
      <div
        class="bg-white w-[90%] md:w-[60%] lg:w-[40%] h-screen overflow-y-scroll p-4"
      >
        <div
          class="absolute top-5 w-[30px] h-[30px] flex items-center justify-center right-5 text-[25px] cursor-pointer hover:bg-red-500 hover:rounded-full"
        >
          <v-icon
            @click="isShowEdit = false"
            name="io-close-outline"
            scale="1.5"
          />
        </div>
        <FormSchema
          v-show="selectedSchemaRow != null"
          :schema="selectedSchemaRow"
          btn-name="Lưu"
          @form-submitted="handleUpdateSchema"
        />
      </div>
    </div>

    <!-- add new component -->
    <div
      v-if="isAddNew"
      @click.self="isAddNew = false"
      class="bg-fog-tb flex justify-end"
    >
      <div
        class="bg-white w-[90%] md:w-[60%] lg:w-[40%] h-screen overflow-y-scroll p-4"
      >
        <div
          class="absolute top-5 w-[30px] h-[30px] flex items-center justify-center right-5 text-[25px] cursor-pointer hover:bg-red-500 hover:rounded-full"
        >
          <v-icon
            @click="isAddNew = false"
            name="io-close-outline"
            scale="1.5"
          />
        </div>
        <FormSchema
          v-show="addNewSchema != null"
          :schema="addNewSchema"
          btn-name="Lưu"
          @form-submitted="handleAddNewSchema"
        />
      </div>
    </div>

    <!-- data list -->
    <div
      v-if="isShowDataList"
      @click.self="isShowDataList = false"
      class="bg-fog-tb flex justify-end"
    >
      <div
        class="bg-white w-[90%] md:w-[60%] lg:w-[40%] h-screen overflow-y-scroll p-4"
      >
        <div
          class="absolute top-5 w-[30px] h-[30px] flex items-center justify-center right-5 text-[25px] cursor-pointer hover:bg-red-500 hover:rounded-full"
        >
          <v-icon
            @click="isShowDataList = false"
            name="io-close-outline"
            scale="1.5"
          />
        </div>
        <FormList
          :data-list="dataList"
          :title="dataListTitle"
          @handle-submit-list="submitList"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import func from "../common/func";
import swal from "../common/swal";
import FormSchema from "./FormSchema.vue";
import FormList from "./FormList.vue";
import API_USER from "../API/API_USER";
import API_COURSE from "../API/API_COURSE";
import { useSystemStore } from "../stores/System";
import schemaConfig from "../common/config/schemaConfig";
import { useAuthStore } from "../stores/Auth";
export default {
  components: {
    FormSchema,
    FormList,
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
    dataList: {
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
    isImportData: {
      type: Boolean,
      default: false,
    },
    dataListTitle: String,
    isDelete: Boolean,
    isUpdate: Boolean,
    isResetPass: Boolean,
    isChangeStatus: Boolean,
    isAddSemester: Boolean,
    isPayment: {
      type: Boolean,
      default: false,
    },
    isChangeStatusClasses: {
      type: Boolean,
      default: false,
    },
    isCreateAccount: {
      type: Boolean,
      default: false,
    },
    isReceiveAdviceRequest: {
      type: Boolean,
      default: false,
    },
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
    isAddChildCourse: {
      type: Boolean,
      default: false,
    },
    isAddByList: {
      type: Boolean,
      default: false,
    },
    reload: {
      type: Boolean,
      default: false,
    },
    isAdd: {
      type: String,
      default: "",
    },
    excel: {
      type: String,
      default: "",
    },
    excelCustom: {
      type: Boolean,
      default: false,
    },
    csv: {
      type: String,
      default: "",
    },
    enum: {
      type: Boolean,
      default: false,
    },
    enumList: Array,
    locationList: {
      type: Array,
      default: [],
    },
    courseList: {
      type: Array,
      default: [],
    },
    tpCategoryList: Array,
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

    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return {
      dataProp,
      systemStore,
      authStore,
    };
  },
  data() {
    return {
      // dataProp: this.data,
      headerProp: this.header,
      isUpdateProp: this.isUpdate,
      isDeleteProp: this.isDelete,
      isExpandProp: this.isExpand,
      isResetPassProp: this.isResetPass,
      isBuyProp: this.isBuy,
      isMultiSelectProp: this.isMultiSelect,
      isAddProp: this.isAdd,
      excelProp: this.excel,
      csvProp: this.csv,
      reloadProp: this.reload,
      isAddByListProp: this.isAddByList,
      dataListProp: this.dataList,
      isPaymentProp: this.isPayment,
      isReceiveAdviceRequestProp: this.isReceiveAdviceRequest,

      fieldsExport: {},
      dataExport: [],
      searchQuery: "",
      selectedField: "",
      searchList: [],
      isShowEdit: false,
      isShowDataList: false,
      isAddNew: false,
      selectedSchemaRow: null,
      addNewSchema: null,
      selectedParentItemOfDataList: null,
      itemsSelected: [],
      parentId: "",
      courses: [],
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
    // this.selectedField = this.headerProp[0]?.value || "";

    let tmpSearchList = [];
    this.headerProp.forEach((item) => {
      if (
        item?.text != "id" &&
        item?.text != "Syllabus" &&
        item?.text != "Avatar" &&
        item?.text != "Image" &&
        item?.text != "Hành động" &&
        item?.text != "Chi tiết" &&
        item?.text != "Ảnh"
      ) {
        tmpSearchList.push(item);
        this.fieldsExport[item?.value] = item?.value;
      }
    });
    this.searchList = tmpSearchList;
    this.selectedField = tmpSearchList[0]?.value || "";

    // this.fetchCourses();
  },
  methods: {
    convertToVND(price) {
      return func.convertVND(price);
    },
    convertDate(date) {
      return func.convertDate(date);
    },
    handleGetDetail(item) {
      this.$emit("clickToRow", item);
    },
    addChildren(item) {
      this.parentId = item?.id;
      this.isShowEdit = true;
      this.selectedSchemaRow = schemaConfig.childrenSchema();
      // this.$emit('addChildren', item)
    },
    showDataList(item) {
      this.isShowDataList = true;
      this.selectedParentItemOfDataList = item;
    },
    resetPassword(item) {
      swal
        .confirm(
          "Bạn có chắc chắn muốn đặt lại mật khẩu của người dùng này không? Mật khẩu mới sẽ là User@123"
        )
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            const data = {
              id: item?.id,
              newPasswordHash: "User@123",
            };
            API_USER.resetPassword(data)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success("Đặt lại mật khẩu thành công");
              })
              .catch((err) => {
                swal.error("Có lỗi xảy ra! Vui lòng thử lại");
                this.systemStore.setChangeLoading(false);
              });
          }
        });
    },
    handlePayment(item) {
      // if (item?.paymentStatus == "Paid")
      //   return swal.info("Đơn hàng này đã được thanh toán!", 3000);
      this.$emit("paymentAction", item);
    },
    goToSyllabus(url) {
      window.open(url, "_blank");
    },
    getAdviceRequest(item) {
      this.$emit("getAdviceRequest", item);
    },
    createAccount(item) {
      this.$emit("createAccount", item);
    },
    handleImportData() {},
    updateStatusAccount() {
      this.$emit("updateStatus", this.itemsSelected);
      this.itemsSelected = [];
    },
    submitList(item) {
      const data = {
        parentObject: this.selectedParentItemOfDataList,
        childrenList: item,
      };
      this.$emit("submitList", data);
      this.selectedParentItemOfDataList = null;
    },
    convertObjectToArray(obj) {
      return Object.keys(obj)
        .filter(
          (key) =>
            key !== "key" &&
            key !== "index" &&
            // key !== "status" &&
            key !== "createdBy" &&
            key !== "creationDate" &&
            key !== "deleteBy" &&
            key !== "deletionDate" &&
            key !== "modificationBy" &&
            key !== "modificationDate" &&
            key !== "equipments" &&
            key !== "isDeleted" &&
            key !== "locationTrainingPrograms" &&
            key !== "users" &&
            key !== "scheduleRooms" &&
            key !== "trainingPrograms" &&
            key != "blogTags" &&
            key != "userAccount" &&
            key != "semesterCourses" &&
            key != "trainingProgramCategory" &&
            key != "trainingProgramCourses" &&
            key != "certificate" &&
            key != "Checkbox" &&
            key != "checkbox" &&
            key != "roleName" &&
            key != "courses" &&
            key != "courseType" &&
            key != "courseId" &&
            key != "actualNumber" &&
            key != "childrenProfiles" &&
            key != "locationName" &&
            key != "classes" &&
            key != "lessons" &&
            key != "semesterId" &&
            key != "roomId" &&
            key != "categoryEquipmentId" &&
            key != "code" &&
            key != "staff" &&
            key != "startTime" &&
            key != "endTime" &&
            key != "adviseRequests" &&
            key != "scheduleClassViews" &&
            key != "statusOfClass" &&
            key != "userId" &&
            key != "level" &&
            key != "prerequisite"
        )
        .map((key) => ({ field: key, value: obj[key] }));
    },
    showFormBuying() {
      this.$emit("showForm", this.itemsSelected);
    },
    addSemester() {
      this.$emit("addSemester", true);
    },
    showAddNewCourse(item) {
      if (item?.courseType == "Single")
        return swal.error("Khoá học đơn không thể tạo khoá học con!", 2500);
      this.isAddNew = true;
      this.addNewSchema = schemaConfig.courseSingleSchema(
        this.courseList,
        this.enumList
      );

      this.addNewSchema.push({
        title: "parentCourse",
        field: "parentCourse",
        value: item?.id,
        type: "text",
        focus: false,
        error: false,
        errMes: "Không được bỏ trống!",
        w: 1,
      });
      // this.addNewSchema["parentCourse"] = [item?.id];
    },
    handleAddNewSchema(data) {
      this.$emit("addNewSchema", data);
    },
    handleClickExcelCustom() {
      this.$emit("handleClickExcelCustom", true);
    },
    goToAddNew() {
      this.$router.push({ name: this.isAddProp, params: {} });
    },
    changeStatusOfClasses() {
      this.$emit("changeStatusOfClasses", this.itemsSelected);
    },
    viewChildrenListByParent(item) {
      this.$emit("viewChildrenListByParent", item);
    },
    separateUpperCase(text) {
      if (/[A-Z]/.test(text)) {
        return text
          .replace(/([A-Z])/g, " $1")
          .trim()
          .replace(/\b\w/g, (firstChar) => firstChar.toUpperCase());
      } else {
        return text.charAt(0).toUpperCase() + text.slice(1);
      }
    },
    editAction(item) {
      this.parentId = "";
      this.isShowEdit = true;
      const tmpSchema = this.convertObjectToArray(item);
      const finalSchema = tmpSchema.map((item) => {
        item["title"] = this.separateUpperCase(item.field);
        item["focus"] = false;
        item["error"] = false;
        item["errMes"] = "This data field cannot be blank!";
        item["w"] = 2;

        if (item.field == "description" || item.field == "address")
          item["type"] = "textarea";
        else if (item.field == "avatar" || item.field == "image")
          item["type"] = "image";
        // else if (item.field == "roleId") {
        //   item["type"] == "select";
        //   API_ROLE.getRoles()
        //     .then((res) => {
        //       return (item["listData"] = res.data);
        //     })
        //     .catch((err) => {});
        // }
        else if (item.field == "status" && this.enum == true) {
          if (this.enumList) {
            this.enumList.map((i) => {
              if (i?.display == item.value) return (item.value = i?.value);
            });
          }

          item["type"] = "select";
          item["listData"] = this.enumList;
        } else if (item.field == "syllabus") {
          item["type"] = "file";
        } else if (item.field == "trainingProgramCategoryId") {
          item["type"] = "select";
          item["listData"] = this.tpCategoryList;
          item["title"] = "Training Program Category";
        } else if (item.field == "genderType") {
          item["type"] = "radio";
          item["listData"] = ["Nam", "Nữ"];
        } else if (item.field == "dateOfBirth") {
          item["type"] = "date";
        } else if (item.field == "content") {
          item["type"] = "quill";
        } else if (item.field == "startDate" || item.field == "endDate") {
          item["type"] = "date";
          // }
          // else if (item.field == "courseType") {
          //   item["type"] = "select";
          //   item["listData"] = [];
        }
        // else if (item.field == "prerequisite") {
        //   item["type"] = "select";
        //   item["listData"] = this.courseList;
        // }
        else if (item.field == "courseId") {
          item["title"] = "Course";
          item["type"] = "select";
          item["listData"] = this.courses;
        } else if (item.field == "isTested") {
          item["title"] = "Tested";
          item["type"] = "radio";
          item["listData"] = ["True", "False"];
          item["value"] = item.value == true ? "True" : "False";
        } else if (item.field == "purchaseDate") {
          item["type"] = "date";
        } else if (item.field == "testDate") {
          item["type"] = "date";
        } else if (item.field == "slotId") {
          item["type"] = "select";
          item["title"] = "Slot";
          item["listData"] = this.enumList;
        } else if (item.field == "locationId") {
          item["type"] = "select";
          item["title"] = "Location";
          item["listData"] = this.locationList;
        } else item["type"] = "text";

        return item;
      });

      this.selectedSchemaRow = finalSchema;
      // this.$router.push({ name: "user-update", params: { id: id.number } });
    },
    deleteAction(item) {
      this.$emit("deleteAction", item);
    },
    reloadAction() {
      this.$emit("reloadAction", true);
    },
    handleUpdateSchema(data) {
      if (this.parentId != "" && this.parentId != null) {
        data["userId"] = this.parentId;
        this.$emit("addChildrenAction", data);
      } else this.$emit("updateAction", data);
    },
    fetchCourses() {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getCourses()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.courses = res.data;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
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

  /* --easy-table-rows-per-page-selector-width: 70px; */
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
