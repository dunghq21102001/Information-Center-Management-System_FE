<template>
  <div class="w-full">
    <div class="max-w-[800px] relative">
      <p
        class="absolute top-[200px] left-[50%] translate-x-[-50%] text-center w-full mx-auto text-[24px]"
      >
        {{ childrenNameProp }}
      </p>
      <p
        class="absolute top-[360px] left-[50%] translate-x-[-50%] text-[24px] w-full text-center mx-auto"
      >
        {{ courseNameProp }}
      </p>
      <p
        class="absolute bottom-[8px] left-[19%] translate-x-[-50%] text-[18px] w-full text-center mx-auto"
      >
        {{ codeProp }}
      </p>
      <img src="../assets/images/certificate.png" alt="" class="w-full" />
    </div>
  </div>
</template>
<script>
import { storage } from "../common/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default {
  props: {
    childrenName: String,
    teacherName: String,
    courseName: String,
    completeDate: String,
    code: String,
  },
  data() {
    return {
      childrenNameProp: this.childrenName,
      teacherNameProp: this.teacherName,
      courseNameProp: this.courseName,
      completeDateProp: this.completeDate,
      codeProp: this.code,
    };
  },
};
</script>
