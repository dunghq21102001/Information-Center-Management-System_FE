<template>
    <div class="w-full">
    <div class="mt-5 w-[90%] mx-auto">
    </div>
    </div>
</template>
<script>
import { useAuthStore } from "../../stores/Auth";
import { useSystemStore } from "../../stores/System";
import {db} from '../../common/firebase'
import { onSnapshot,
  collection,
  doc,
  deleteDoc,
  setDoc,
  addDoc,
  orderBy,
  query,
  Timestamp,} from 'firebase/firestore'
  import swal from '../../common/swal'
export default {
  setup() {
    const authStore = useAuthStore();
    const systemStore = useSystemStore();
    return { authStore, systemStore };
  },
  data() {
    return {
      clientBoxChats: [],
      messages: [],
      messageText: ''
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
