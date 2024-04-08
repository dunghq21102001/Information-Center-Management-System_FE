<template>
  <div class="w-full">
    <div class="w-full mb-5">
      <span class="block text-gray-600 font-bold text-[24px]">
        Xem lịch học và điểm danh của {{ childrenData?.fullName }} môn
        {{ data[0]?.courseName }}
      </span>
    </div>
    <div class="w-full flex items-start justify-between flex-wrap">
      <div class="w-[30%] flex items-start justify-between">
        <ul class="w-[70%]">
          <li class="li-h bg-primary border-r-[1px]">Course</li>
          <li class="w-full px-2 my-1 py-1 bb-c">
            {{ data[0]?.courseCode }}
          </li>
        </ul>
        <ul class="w-[30%]">
          <li class="li-h bg-primary border-r-[#e5e5e5] border-r-solid">
            Classes
          </li>
          <li class="w-full px-2 my-1 py-1 bb-c">
            {{ data[0]?.classCode }}
          </li>
        </ul>
      </div>
      <div class="w-[70%]">
        <table class="w-full">
          <thead>
            <tr>
              <th class="bg-primary">No.</th>
              <th class="bg-primary">Ngày</th>
              <th class="bg-primary">Slot</th>
              <th class="bg-primary">Phòng</th>
              <th class="bg-primary">Giáo viên</th>
              <th class="bg-primary">Trạng thái</th>
              <th class="bg-primary">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data">
              <td>
                <div class="px-2 py-[5px] text-center">{{ index + 1 }}</div>
              </td>
              <td>
                <div class="px-2 py-[5px] text-center">
                  {{ getDataOfDate(item?.date) }} {{ convertDate(item?.date) }}
                </div>
              </td>
              <td>
                <div class="px-2 py-[5px] text-center">{{ item?.slot }}</div>
              </td>
              <td>
                <div class="px-2 py-[5px] text-center">
                  {{ item?.roomName }}
                </div>
              </td>
              <td>
                <div class="px-2 py-[5px] text-center">
                  {{ item?.teacherName }}
                </div>
              </td>
              <td>
                <div
                  class="px-2 py-[5px] text-center"
                  :class="
                    item?.attendanceStatus == 'Absent'
                      ? 'text-red-500'
                      : item?.attendanceStatus == 'Future'
                      ? ''
                      : 'text-green-500'
                  "
                >
                  {{ item?.attendanceStatus }}
                </div>
              </td>
              <td>
                <div class="px-2 py-[5px] text-center">
                  {{ item?.teacherComment }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { useSystemStore } from "../stores/System.js";
import { useAuthStore } from "../stores/Auth.js";
import func from "../common/func.js";
export default {
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    childrenData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    convertDate(date) {
      return func.convertDate(date);
    },
    getDataOfDate(date) {
      let d = new Date(date).getDay();
      let fData = null;
      switch (d) {
        case 1:
          fData = "Thứ 2";
          break;
        case 2:
          fData = "Thứ 3";
          break;
        case 3:
          fData = "Thứ 4";
          break;
        case 4:
          fData = "Thứ 5";
          break;
        case 5:
          fData = "Thứ 6";
          break;
        case 6:
          fData = "Thứ 7";
          break;
        case 0:
          fData = "Chủ nhật";
          break;
      }

      return fData;
    },
  },
};
</script>
<style scoped>
.bb-c {
  border-bottom: 1px solid #d9eced;
}

.is-active {
  color: #007d88;
}

.li-h {
  color: #fff;
  padding: 4px 8px;
  font-weight: bold;
}

th {
  color: #fff;
  padding: 4px 8px;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid rgb(229, 229, 229);
}

td {
  border: 1px solid rgb(184, 184, 184);
}
</style>
