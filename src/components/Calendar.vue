<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto mt-5">
      <vue-cal
        locale="vi"
        :editable-events="{
          title: isPermissionProp.title,
          drag: isPermissionProp.drag,
          resize: isPermissionProp.resize,
          delete: isPermissionProp.delete,
          create: isPermissionProp.create,
        }"
        class="vuecal--full-height-delete"
        active-view="month"
        events-on-month-view="short"
        @event-drag-create="showEventCreationDialog = true"
        :drag-to-create-event="isPermissionProp.create"
        :on-event-create="onEventCreate"
        :events="eventsProp"
      />
    </div>

    <div class="bg-fog" v-show="showEventCreationDialog">
      <div
        class="w-[90%] md:w-[50%] bg-white rounded-xl overflow-y-scroll hide-scrollbar pb-3"
      >
        <!-- title -->
        <div class="h-[50px] w-full bg-[#d9eced] px-3">
          <input
            type="text"
            class="i-cus bg-[#d9eced]"
            placeholder="Title"
            v-model="selectedEvent.title"
          />
        </div>

        <!-- content -->
        <div class="w-full bg-white px-3 mt-3">
          <textarea
            class="w-full outline-none i-cus resize-none"
            rows="3"
            placeholder="Content"
            v-model="selectedEvent.content"
          ></textarea>
          <select @change="changeBgColor" class="w-full select-primary py-3">
            <option v-for="item in eventsCssClasses" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="w-full px-3 flex items-center justify-end mt-3">
          <button
            class="px-3 py-1 rounded-md btn-cancel"
            @click="cancelEventCreation"
          >
            Cancel
          </button>
          <button
            class="ml-4 px-3 py-1 rounded-md btn-primary"
            @click="closeCreationDialog"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    events: Array,
    isPermission: Object,
  },
  components: {},
  data() {
    return {
      eventsProp: this.events,
      isPermissionProp: this.isPermission,
      selectedEvent: {
        title: "",
        content: "",
        start: "",
        end: "",
        class: "type-1",
        background: false,
      },
      showEventCreationDialog: false,
      eventsCssClasses: ["type-1", "type-2", "type-3"],
    };
  },
  created() {},
  methods: {
    onEventCreate(event, deleteEventFunction) {
      this.selectedEvent = event;
      this.deleteEventFunction = deleteEventFunction;

      return event;
    },
    cancelEventCreation() {
      this.closeCreationDialog();
      this.deleteEventFunction();
    },
    closeCreationDialog() {
      this.showEventCreationDialog = false;
      this.selectedEvent = {
        title: "",
        content: "",
        start: "",
        end: "",
        class: "type-1",
        background: false,
      };
    },
    changeBgColor(event) {
      this.selectedEvent.class = event.target.value;
    },
  },
};
</script>

<style>
.bg-fog {
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.type-1 {
  background-color: #fdab5e !important;
  color: white !important;
}
.type-2 {
  background-color: #ff7d7d !important;
  color: #fff !important;
}
.type-3 {
  background-color: #5ec395 !important;
  color: #fff !important;
}

.vuecal--month-view .vuecal__cell {
  height: 150px;
}
</style>
