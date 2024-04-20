<template>
  <div class="book">
    <div>
      <p class="block text-center font-bold w-[95%]">{{ child?.fullName }} ({{ child?.genderType }})</p>
      <span class="block text-center">{{ getAge(child?.birthDay) }} tuổi</span>
      <div
        class="w-full flex flex-col items-center justify-center flex-wrap mt-2"
      >
        <button class="btn-primary px-3 py-1" @click="handleEdit(child)">
          Sửa thông tin
        </button>
        <button
          class="btn-primary px-3 py-1 mt-2"
          @click="handleGetDetail(child)"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
    <div class="cover">
      <div
        class="w-full h-[200px] overflow-hidden flex items-center justify-center bg-white"
      >
        <img :src="child?.avatar" class="object-cover w-full" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    child: Object,
  },
  computed: {
   
  },
  methods: {
    handleEdit(child) {
      this.$emit("handleEdit", child);
    },
    handleGetDetail(child) {
      this.$emit("handleGetDetail", child);
    },
    getAge(date) {
      const curYear = new Date().getFullYear();
      const d = new Date(date).getFullYear();
      return curYear - d;
    },
  },
};
</script>
<style scoped>
.book {
  position: relative;
  border-radius: 10px;
  width: 100%;
  height: 200px;
  /* background-color: whitesmoke; */
  /* -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000; */
  /* -webkit-transform: preserve-3d;
  -ms-transform: preserve-3d;
  transform: preserve-3d; */
  -webkit-perspective: 2000px;
  perspective: 2000px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.cover {
  top: 0;
  position: absolute;
  /* background-color: lightgray; */
  width: 100%;
  height: 100%;
  cursor: pointer;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform-origin: 0;
  -ms-transform-origin: 0;
  transform-origin: 0;
  -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.book:hover .cover {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform: rotatey(-90deg);
  -ms-transform: rotatey(-90deg);
  transform: rotatey(-90deg);
}

p {
  font-size: 20px;
  font-weight: bolder;
}
</style>
