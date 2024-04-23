<template>
  <div class="w-full body">
    <div class="w-[90%] mx-auto h-[90vh] overflow-hidden">
      <div class="certificate-container">
        <div class="certificate">
          <div class="water-mark-overlay"></div>
          <div class="certificate-header">
            <img src="../assets/images/logo.png" class="logo" alt="" />
          </div>
          <div class="certificate-body">
            <p class="certificate-title text-[30px]">
              <strong>Trung tâm KidProEdu</strong>
            </p>
            <h1>Chứng chỉ tin học</h1>
            <p class="student-name">{{ dataCertificate?.fullName }}</p>
            <div class="certificate-content">
              <div class="about-certificate text-[20px] mt-2 mx-auto">
                <p>
                  Đã hoàn thành xuất sắc khoá học <br />
                  <span class="font-bold text-[20px]">
                    {{ dataCertificate?.courseName }}
                  </span>
                </p>
              </div>
              <p class="topic-title mt-2">
                Vào ngày {{ convertDate(dataCertificate?.createDay) }}
              </p>
              <!-- <div class="text-center">
                <p class="topic-description text-muted">
                  Contract adminitrator - Types of claim - Claim Strategy -
                  Delay analysis - Thepreliminaries to a claim - The essential
                  elements to a successful claim - Responses - Claim preparation
                  and presentation
                </p>
              </div> -->
            </div>
            <div class="certificate-footer text-muted mt-20">
              <div class="row flex w-full justify-between items-start px-10">
                <div class="col-md-6">
                  <p>Code: {{ code }}</p>
                </div>
                <div class="col-md-6">
                  <p>Giám đốc:</p>
                  <img
                    class="relative top-[-90px] left-[50px] w-[200px]"
                    src="../assets/images/stamp.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API_USER from "../API/API_USER";
import func from "../common/func";
import swal from "../common/swal";
import { useSystemStore } from "../stores/System";
export default {
  props: {},

  data() {
    return {
      childrenId: "",
      code: "",
      dataCertificate: null,
    };
  },
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  created() {
    this.childrenId = this.$route.query.childrenId;
    this.code = this.$route.query.code;
    this.fetchChildren();
  },
  methods: {
    fetchChildren() {
      this.systemStore.setChangeLoading(true);
      API_USER.getChildrenById(this.childrenId)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          const dataCerti = res.data?.certificates.find(
            (item) => (item.code = this.code)
          );
          if (dataCerti) {
            this.dataCertificate = dataCerti;
          } else {
            this.$router.push({ name: "profile", params: {} });
            swal.error("Chứng chỉ không được tìm thấy");
          }
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          this.$router.push({ name: "profile", params: {} });
          swal.error("Chứng chỉ không được tìm thấy");
        });
    },
    convertDate(date) {
      return func.convertDate(date);
    },
  },
};
</script>
<style scoped>
.body {
  font-family: Roboto;
}

.certificate-container {
  margin: 0 auto;
  padding: 50px;
  width: 1024px;
}
.certificate {
  border: 20px solid #0c5280;
  padding: 25px;
  height: 82vh;
  position: relative;
}

.certificate:after {
  content: "";
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  position: absolute;
  background-image: url(https://image.ibb.co/ckrVv7/water_mark_logo.png);
  background-size: 100%;
  z-index: -1;
}

.certificate-header > .logo {
  width: 130px;
  height: 130px;
}

.certificate-title {
  text-align: center;
}

.certificate-body {
  text-align: center;
}

h1 {
  font-weight: 400;
  font-size: 48px;
  color: #0c5280;
}

.student-name {
  font-size: 24px;
}

.certificate-content {
  margin: 0 auto;
  width: 750px;
}

.about-certificate {
  width: 380px;
}

.topic-description {
  text-align: center;
}

.i-c {
  width: 500px !important;
}
</style>
