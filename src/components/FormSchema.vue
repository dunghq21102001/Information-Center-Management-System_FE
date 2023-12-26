<template>
  <div class="w-full mt-4">
    <div class="w-[95%] mx-auto grid grid-cols-12 gap-3">
      <div
        v-for="item in schemaProp"
        :key="item.title"
        :class="`col-span-12 ${
          item.w == 1 ? 'md:col-span-6' : 'md:col-span-12'
        }`"
      >
        <label>{{ item.title }}</label>
        <input
          v-if="item.type === 'text' || item.type === 'number'"
          @focus="item.focus = true"
          @blur="item.focus = false"
          :type="item.type"
          :class="{ 'on-focus': item.focus }"
          v-model="item.value"
          class="input-cus"
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
            <img :src="item?.value" class="w-full object-fill" />
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
            <span class="block w-full">{{ item?.value }}</span>
          </div>
          <input
            @change="changeFile($event, item?.field)"
            type="file"
            id="file"
            class="w-full h-[100px] cursor-pointer opacity-0"
          />
        </div>
        <small :class="item.error ? 'err-ms' : 'opacity-0'">err here</small>
      </div>
    </div>
    <div class="w-[95%] mx-auto flex items-center justify-end">
      <button class="btn-cancel px-4 py-1 mr-3">Cancel</button>
      <button class="btn-primary px-4 py-1" @click="submitForm">
        {{ btnProp }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    schema: Array,
    btnName: String,
  },
  data() {
    return {
      schemaProp: this.schema,
      btnProp: this.btnName,
    };
  },
  methods: {
    submitForm() {
      const formDataObject = this.convertArrayToObject(this.schemaProp);
      this.$emit("form-submitted", formDataObject);
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
    changeFile(event, field) {
      this.schemaProp.forEach((item) => {
        if (item.field === field) {
          item.value = event.target.files[0].name;
        }
      });
    },
  },
};
</script>

<style scoped>
.input-cus {
  outline: none;
  border-bottom: 2px solid rgb(212, 212, 212);
  padding: 10px 8px;
  width: 100%;
}

.on-focus {
  border-bottom: 2px solid #007d88;
}

.err-ms {
  color: red;
  opacity: 1;
}

.br-dash {
  border: 1px dashed rgb(163, 163, 163);
  border-radius: 10px;
}
</style>
