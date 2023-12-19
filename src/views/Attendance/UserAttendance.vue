<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto">
      <!-- search -->
      <div class="w-full flex flex-wrap items-end mt-5">
        <div class="w-[200px] mr-4">
          <span class="block mb-2">Choose Month</span>
          <VueDatePicker
            month-picker
            v-model="monthPicked"
            :enable-time-picker="false"
          ></VueDatePicker>
        </div>
        <div class="w-[200px] mr-4">
          <span class="block mb-2">Search User</span>
          <input
            type="text"
            class="outline-none px-3 py-2 h-[38px] rounded-md br-c"
            v-model="searchQuery"
            placeholder="Ex: Nguyen Van A"
          />
        </div>
      </div>

      <!-- table -->
      <div class="w-full mt-5 overflow-x-scroll hide-scrollbar">
        <table class="table-c">
          <thead>
            <tr>
              <th class="one-th">User</th>
              <th
                class="all-th"
                v-for="(day, index) in getDaysInMonth()"
                :key="index"
              >
                {{ day }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataFetch">
              <td>
                <div class="w-[200px] flex items-center justify-between">
                  <div
                    class="w-[70px] h-[70px] overflow-hidden rounded-full flex items-center justify-center"
                  >
                    <img
                      :src="item?.image"
                      alt="user avt"
                      class="w-full object-fill"
                    />
                  </div>
                  <span class="font-bold">{{ item.name }}</span>
                </div>
              </td>
              <td v-for="sta of item.attendanceSheet">
                <v-icon v-if="sta == 1" fill="#2f8754" name="bi-check-circle" />
                <v-icon v-else-if="sta == 2" color fill="#dc3545" name="md-highlightoff-round" />
                <v-icon v-else fill="#ffc107" name="bi-circle-half" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      monthPicked: null,
      monthSelected: null,
      searchQuery: "",
      dataFetch: [
        {
          name: "Nguyen Van A",
          image:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
          attendanceSheet: [
            1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1,
            1, 1, 1, 3, 1, 1, 1, 1,
          ],
        },
        {
          name: "Nguyen Van B",
          image:
            "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
          attendanceSheet: [
            1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 3, 1, 1,
            1, 1, 1, 3, 1, 1, 1, 1,
          ],
        },
        {
          name: "Nguyen Van C",
          image:
            "https://cdn.vectorstock.com/i/preview-1x/17/61/male-avatar-profile-picture-vector-10211761.jpg",
          attendanceSheet: [
            1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3, 1, 1,
            1, 1, 1, 3, 1, 2, 1, 1,
          ],
        },
      ],
    };
  },
  watch: {
    monthPicked() {
      if (typeof this.monthPicked === "object") {
        this.monthSelected = `${this.monthPicked?.month + 1}/${
          this.monthPicked?.year
        }`;
      }
    },
  },
  created() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    this.monthSelected = `${currentMonth}/${currentYear}`;
    this.monthPicked = this.monthSelected;
  },
  methods: {
    getDaysInMonth() {
      if (this.monthSelected) {
        const [month, year] = this.monthSelected.split("/");
        const daysInMonth = new Date(year, month, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
      }
      return [];
    },
  },
};
</script>
<style scoped>
.table-c,
th,
td {
  padding: 5px;
  border: 1px solid rgb(212, 212, 212);
}

.all-th {
  min-width: 50px;
  background-color: #f5f5f5;
  color: #666;
}

.one-th {
  min-width: 200px;
  background-color: #f5f5f5;
  color: #666;
}

th,
td {
  text-align: center;
}

.br-c {
  border: 1px solid #dddddd;
}
</style>
