<template>
    <div class="w-full">
        <p class="page-sub-title">Security</p>
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-12 flex flex-col items-start">
                <label for="curPass">Current Password</label>
                <input id="curPass" type="password" class="i-cus" value="12345678">
            </div>
            <div class="col-span-12 flex flex-col items-start">
                <label for="newP">New Password</label>
                <input id="newP" type="password" class="i-cus" value="12345678">
            </div>
            <div class="col-span-12 flex flex-col items-start">
                <label for="newPAgain">New Password Again</label>
                <input id="newPAgain" type="password" class="i-cus" value="12345678">
            </div>
        </div>
        <div class="w-full flex items-center justify-end mt-5">
            <button class="btn-primary px-3 py-1 rounded-lg">
                Save
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: {},
    components: {},
    data() {
        return {}
    },
    created() { },
    methods: {}
}
</script>