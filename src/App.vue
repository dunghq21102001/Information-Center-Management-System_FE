<template>
  <Header />
  <Transition name="sidebar">
    <Sidebar />
  </Transition>
  <div class="w-[80%] float-right">
    <RouterView />
  </div>
  <Loading v-show="systemStore.getLoading" />
</template>

<script>
import { useSystemStore } from './stores/system'
import Loading from './components/Loading.vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
export default {
  components: {
    Loading, Header,
    Sidebar
  },
  setup() {
    const systemStore = useSystemStore()
    return { systemStore }
  },
  methods: {
    test() {
      this.systemStore.setChangeLoading(true)
    }
  }
}
</script>
<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: 0.5s ease;
}

.sidebar-enter-from {
  transform: translateX(-100%);
}

.sidebar-leave-to {
  transform: translateX(-80%);
}
</style>
