<template>
  <div class="w-full">
    <div class="max-w-[800px] relative">
      <p
        class="absolute top-[190px] left-[50%] translate-x-[-50%] text-center w-full mx-auto text-[24px]"
      >
        {{ childrenNameProp }}
      </p>
      <p
        class="absolute top-[230px] left-[50%] translate-x-[-50%] text-[16px] w-full text-center mx-auto"
      >
        On {{ completeDateProp }} successfully completed the course
      </p>
      <p
        class="absolute top-[250px] left-[50%] translate-x-[-50%] text-[24px] w-full text-center mx-auto"
      >
        {{ courseNameProp }}
      </p>
      <p
        class="absolute top-[300px] left-[50%] translate-x-[-50%] text-[16px] w-full text-center mx-auto"
      >
        Taught by:
      </p>
      <p
        class="absolute top-[320px] left-[50%] translate-x-[-50%] text-[24px] w-full text-center mx-auto"
      >
        {{ teacherNameProp }}
      </p>
      <p class="absolute bottom-[50px] left-[60px] text-[12px]">
        Code: {{ codeProp }}
      </p>
      <img src="../assets/images/certificate.png" alt="" class="w-full" />
    </div>
  </div>
</template>
<script>
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
