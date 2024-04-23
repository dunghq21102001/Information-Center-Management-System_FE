<template>
  <div class="w-full pt-5 min-h-[75vh]">
    <span class="text-[28px] font-bold block pl-6 text-gray-700">{{
      pageTitle
    }}</span>
    <div class="w-[90%] mx-auto grid grid-cols-12 gap-3 mt-5">
      <div
        v-for="item in schemaProp"
        :key="item.title"
        :class="`col-span-12 ${
          item.w == 1 ? 'md:col-span-6' : 'md:col-span-12'
        } ${
          item.title == 'Id' ||
          item.title == 'Location' ||
          item.title == 'Status Advise Request' ||
          item?.title == 'User Id' ||
          item?.title == 'parentCourse' ||
          (item?.field == 'contractCodeTmp' && isShowContract != true) ||
          (item?.field == 'configJobTypeIdTmp' && isShowContract != true) ||
          (item?.field == 'startDateTmp' && isShowContract != true) ||
          (item?.field == 'endDateTmp' && isShowContract != true) ||
          (item?.field == 'jobTmp' && isShowContract != true) ||
          (item?.field == 'fileTmp' && isShowContract != true)
            ? 'hidden'
            : ''
        }`"
      >
        <label>{{ item.title }}</label>
        <input
          v-if="item.type === 'text' || item.type === 'number'"
          @focus="item.focus = true"
          @blur="item.focus = false"
          :type="item.type"
          :class="{
            'on-focus': item.focus,
            'cursor-not-allowed':
              item.title == 'Status' || item.title == 'status',
          }"
          v-model="item.value"
          class="input-cus"
          :disabled="item.title == 'Status' || item.title == 'status'"
        />
        <input
          v-else-if="item.type === 'date'"
          @focus="item.focus = true"
          @blur="item.focus = false"
          type="datetime-local"
          :class="{ 'on-focus': item.focus }"
          v-model="item.value"
          class="input-cus"
          :disabled="
            item.title == 'startDate' ||
            item.title == 'endDate' ||
            item.title == 'Start Date' ||
            item.title == 'End Date'
          "
        />
        <textarea
          cols="1"
          rows="5"
          v-else-if="item.type === 'textarea'"
          @focus="item.focus = true"
          @blur="item.focus = false"
          :class="{ 'on-focus': item.focus }"
          v-model="item.value"
          class="input-cus"
        ></textarea>
        <div class="w-full" v-else-if="item.type === 'select'">
          <!-- <select
            v-model="item.value"
            class="w-full px-3 py-2 mt-[5px] select-c"
          >
            <option v-for="i in item.listData" :value="i?.id || i?.value">
              {{ i?.name || i?.display || i?.tagName }}
            </option>
          </select> -->
          <Dropdown
            v-model="item.value"
            :options="item.listData"
            :optionValue="getDisplayValue(item.listData)"
            :optionLabel="getDisplayField(item.listData)"
            placeholder="Chọn 1"
            class="w-full py-[11px] pl-3"
            @change="(e) => onChangeSelect(e, item)"
          >
            <template #option="slotProps">
              <div class="w-full">
                <div>
                  {{
                    slotProps?.option?.display ||
                    slotProps?.option?.name ||
                    slotProps?.option?.tagName ||
                    slotProps?.option?.jobType
                  }}

                  {{
                    slotProps?.option?.startTime
                      ? `(Từ ${slotProps?.option?.startTime} - đến ${slotProps?.option?.endTime})`
                      : null
                  }}
                </div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="w-full pt-3" v-else-if="item.type === 'quill'">
          <QuillEditor
            ref="quill"
            placeholder="Type here ..."
            theme="snow"
            toolbar="full"
            v-model:content="item.value"
          >
          </QuillEditor>
        </div>
        <div class="w-full pt-3" v-else-if="item.type === 'multiSelect'">
          <div class="card flex justify-content-center">
            <MultiSelect
              v-model="item.value"
              :options="item.listData"
              :optionLabel="`tagName`"
              placeholder="Chọn 1 hoặc nhiều"
              class="w-full px-3 py-1"
            />
          </div>
        </div>
        <div
          class="w-full flex items-center flex-wrap pt-6"
          v-else-if="item.type === 'radio'"
        >
          <div class="flex items-center mr-5" v-for="i in item.listData">
            <input type="radio" :id="i" :value="i" v-model="item.value" />
            <label :for="i" class="ml-2">
              {{ i }}
            </label>
          </div>
        </div>
        <div
          @dragover.prevent="handleDragOver($event, item?.field)"
          @drop="handleDrop($event, item?.field)"
          class="w-full h-[140px] mt-4 relative br-dash"
          v-else-if="item.type === 'image'"
        >
          <div
            class="absolute top-[50%] translate-y-[-50%] left-6 flex items-center"
          >
            <button class="btn-primary px-3 py-1">Click to choose image</button>
            <span class="ml-2 hidden lg:block">or drag and drop file here</span>
          </div>
          <div
            v-show="item?.value != ''"
            class="absolute right-3 h-[100px] w-[100px] top-[50%] translate-y-[-50%] overflow-hidden"
          >
            <img :src="item?.value" class="w-full object-cover" />
          </div>
          <input
            type="file"
            id="img"
            class="w-full h-[100px] cursor-pointer opacity-0"
            ref="fileInput"
            @change="handleFileChange($event, item?.field)"
          />
        </div>
        <div
          class="w-full h-[140px] mt-4 relative br-dash"
          v-else-if="item.type === 'file'"
        >
          <div
            class="absolute top-[50%] translate-y-[-50%] left-6 flex items-center"
          >
            <button class="btn-primary px-3 py-1">Click to choose file</button>
          </div>
          <div
            :title="item.value"
            v-show="item?.value != ''"
            class="absolute right-3 text-right top-[50%] w-[190px] md:w-[400px] lg:w-[500px] overflow-hidden translate-y-[-50%]"
          >
            <span class="block w-full">{{
              item?.value != "" ? "Selected file" : ""
            }}</span>
          </div>
          <input
            @change="changeFile($event, item?.field)"
            type="file"
            id="file"
            class="w-full h-[100px] cursor-pointer opacity-0"
          />
        </div>
        <small :class="item.error ? 'err-ms' : 'opacity-0'">{{
          item?.errMes
        }}</small>
      </div>
    </div>
    <div class="w-[90%] mx-auto flex items-center justify-end">
      <!-- <button class="btn-cancel px-4 py-1 mr-3">Cancel</button> -->
      <button
        v-show="isHideAddBtn == false"
        class="btn-primary px-4 py-1"
        @click="submitForm"
      >
        {{ btnProp }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import MultiSelect from "primevue/multiselect";
import Dropdown from "primevue/dropdown";
import swal from "../common/swal";
export default {
  components: {
    QuillEditor,
    MultiSelect,
    Dropdown,
  },
  setup(props) {
    const schemaProp = ref(props.schema);
    watch(
      () => props.schema,
      (newValue) => {
        schemaProp.value = newValue;
      }
    );

    return {
      schemaProp,
    };
  },
  props: {
    pageTitle: String,
    schema: Array,
    btnName: String,
    isHideAddBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // schemaProp: this.schema,
      btnProp: this.btnName,
      isValid: true,
      //  isHideAddBtnProp: this.isHideAddBtn
      isShowContract: false,
    };
  },
  mounted() {
    this.setContent();
  },
  methods: {
    submitForm() {
      this.validateForm();
      if (this.isValid) {
        let formDataObject = this.convertArrayToObject(this.schemaProp);
        if (formDataObject["content"])
          formDataObject["content"] = this.$refs.quill[0]?.getHTML();
        this.$emit("form-submitted", formDataObject);
      } else
        return swal.error("Bạn cần phải điền tất cả thông tin cần thiết", 3000);
    },
    validateForm() {
      this.isValid = true;
      this.schemaProp.forEach((item) => {
        if (
          item?.field != "bankAccountNumber" &&
          item?.field != "bankAccountName" &&
          item?.field != "bankName" &&
          item?.field != "startDateTmp" &&
          item?.field != "endDateTmp" &&
          item?.field != "contractCodeTmp" &&
          item?.field != "configJobTypeIdTmp" &&
          item?.field != "jobTmp" &&
          item?.field != "fileTmp"
        ) {
          if (item.field === "phone") {
            if (!this.isValidPhoneNumber(item.value)) {
              item.error = true;
              this.isValid = false;
              item.errMes = "Số điện thoại không hợp lệ";
            } else {
              item.error = false;
            }
          } else if (item.field == "tags") {
            if (item.value.length == 0) {
              item.error = true;
              this.isValid = false;
              item.errMes = "Bạn phải chọn ít nhất 1 nhãn cho blog";
            }
          } else {
            if (
              item.value === null ||
              (typeof item.value === "string" && item.value.trim() === "")
            ) {
              item.error = true;
              this.isValid = false;
            } else {
              item.error = false;
            }
          }
        }
      });
    },
    isValidPhoneNumber(phoneNumber) {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phoneNumber);
    },
    onChangeSelect(e, item) {
      if (item?.field == "roleId") {
        if (e.value == "d5fa55c7-315d-4634-9c73-08dbbc3f3a53")
          this.isShowContract = true;
        else this.isShowContract = false;
      }
    },
    convertArrayToObject(formData) {
      return formData.reduce((acc, item) => {
        acc[item.field] = item.value;
        return acc;
      }, {});
    },
    handleDragOver(event, field) {
      event.preventDefault();
    },
    handleDrop(event, field) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.handleFiles(files, field);
    },
    handleFileChange(event, field) {
      const files = event.target.files;
      if (!this.validateImage(files)) {
        event.target.value = null;
        swal.error(
          "Chỉ có thể chọn ảnh với các định dạng sau: jpg/ jpeg/ png/ gif",
          2500
        );
        return;
      }
      this.handleFiles(files, field);
    },
    handleFiles(files, field) {
      this.schemaProp.forEach((item) => {
        if (item.field === field) {
          const tmpURL = URL.createObjectURL(files[0]);
          item.value = tmpURL;
        }
      });
    },
    validateImage(files) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!allowedExtensions.exec(file.name)) {
          return false;
        }
      }
      return true;
    },
    validatePDF(files) {
      const allowedExtensions = /(\.pdf)$/i; // Chỉ cho phép tệp PDF
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!allowedExtensions.exec(file.name)) {
          return false;
        }
      }
      return true;
    },
    changeFile(event, field) {
      const files = event.target.files;
      if (!this.validatePDF(files)) {
        event.target.value = null;
        swal.error("Chỉ có thể chọn file PDF", 2500);
        return;
      }
      this.schemaProp.forEach((item) => {
        if (item.field === field) {
          const tmpURL = URL.createObjectURL(files[0]);
          item.value = tmpURL;
        }
      });
    },
    setContent() {
      this.schemaProp?.map((item) => {
        if (item?.field == "content") {
          this.$refs.quill[0]?.pasteHTML(item?.value);
        }
      });
    },
    getDisplayField(item) {
      // {{ i?.name || i?.display || i?.tagName || semesterName }}
      let fieldName = "";
      if (item[0]?.name) fieldName = "name";
      if (item[0]?.display) fieldName = "display";
      if (item[0]?.tagName) fieldName = "tagName";
      if (item[0]?.semesterName) fieldName = "semesterName";
      if (item[0]?.jobType) fieldName = "jobType";

      return fieldName;
    },
    getDisplayValue(item) {
      let value = "";
      if (item[0]?.name) value = "id";
      if (item[0]?.display) value = "value";
      if (item[0]?.tagName) value = "id";
      if (item[0]?.jobType) value = "id";

      return value;
    },
  },
};
</script>

<style>
.input-cus {
  outline: none;
  border-bottom: 2px solid rgb(212, 212, 212);
  padding: 10px 8px;
  width: 100%;
}

.err-ms {
  color: red;
  opacity: 1;
}

.br-dash {
  border: 1px dashed rgb(163, 163, 163);
  border-radius: 10px;
}

input[type="radio"] {
  -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Chrome, Safari, Opera */
  transform: scale(1.5);
}

.select-c {
  border-bottom: 2px solid rgb(212, 212, 212);
  outline: none;
  border-radius: 1px;
}

.p-multiselect-item {
  padding: 10px 0;
}

.p-overlay-open {
  box-shadow: 1px 1px 1px 1px #000;
}
</style>
