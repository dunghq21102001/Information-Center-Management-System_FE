<template>
    <div class="w-full flex items-center justify-center">
        <button class="btn-primary px-2 py-1 rounded-md mx-1">
            First
        </button>
        <button class="btn-primary px-2 py-1 rounded-md mx-1">
            Pre
        </button>
        <button class="active btn-primary px-2 py-1 rounded-md mx-1">
            1
        </button>
        <button class="btn-primary px-2 py-1 rounded-md mx-1">
            Next
        </button>
        <button class="btn-primary px-2 py-1 rounded-md mx-1">
            Last
        </button>
    </div>
</template>
<script>
export default {
    props: {},
    components: {},
    data() {
        return {
            currentPage: 1
        }
    },
    created() {},
    methods: {}
}
</script>
<style scoped>
.active {
    background-color: #007d88;
    color: white;
}
</style>