<template>
    <div class="w-full grid grid-cols-12 gap-3">
        <!-- 1 -->
        <div class="col-span-12 md:col-span-6 lg:col-span-3 box">
            <div class="flex flex-col items-center text-[18px]">
                <span>914,001</span>
                <span>Users</span>
            </div>
            <v-icon name="hi-user-group" :scale="1.5" fill="#007d88" />
        </div>
        <!-- 2 -->
        <div class="col-span-12 md:col-span-6 lg:col-span-3 box">
            <div class="flex flex-col items-center text-[18px]">
                <span>340.201.000 VND</span>
                <span>Revenue</span>
            </div>
            <v-icon name="gi-receive-money" :scale="1.5" fill="#007d88" />
        </div>
        <!-- 3 -->
        <div class="col-span-12 md:col-span-6 lg:col-span-3 box">
            <div class="flex flex-col items-center text-[18px]">
                <span>105.001.000 VND</span>
                <span>Salary Paid</span>
            </div>
            <v-icon name="gi-pay-money" :scale="1.5" fill="#007d88" />
        </div>
        <!-- 4 -->
        <div class="col-span-12 md:col-span-6 lg:col-span-3 box">
            <div class="flex flex-col items-center text-[18px]">
                <span>241</span>
                <span>Courses</span>
            </div>
            <v-icon name="gi-book-cover" :scale="1.5" fill="#007d88" />
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    props: {},
    data() {
        return {}
    },
    methods: {},
    created() { }
}
</script>
<style scoped>
.box {
    border: 1px solid #d9eced;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;
}
</style>