<template>
    <div class="w-full">
    <div class="mt-5 w-[90%] mx-auto">
    </div>
    </div>
</template>
<script>
import { useAuthStore } from "../../stores/Auth";
import { useSystemStore } from "../../stores/System";

export default {
  setup() {
    const authStore = useAuthStore();
    const systemStore = useSystemStore();
    return { authStore, systemStore };
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
