<template>
    <div class="w-full">
        <p class="page-sub-title">General information</p>
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-12 md:col-span-6 flex flex-col items-start">
                <label for="fullName">Full Name</label>
                <input id="fillName" type="text" class="i-cus" value="Nguyễn Văn A">
            </div>
            <div class="col-span-12 md:col-span-6 flex flex-col items-start">
                <label for="age">Age</label>
                <input id="age" type="text" class="i-cus" value="22">
            </div>
            <div class="col-span-12 md:col-span-6 flex flex-col items-start">
                <label for="email">Email</label>
                <input id="email" type="email" class="i-cus" value="avnse000000@fpt.edu.vn">
            </div>
            <div class="col-span-12 md:col-span-6 flex flex-col items-start">
                <label for="phone">Phone Number</label>
                <input id="phone" type="text" class="i-cus" value="0901958271">
            </div>
            <div class="col-span-12 flex flex-col items-start">
                <label for="fullName">Address</label>
                <input type="text" class="i-cus"
                    value="144/2 đường QWERTYUIOPSD khu phố ASDFGHJZXCVB ấp X xã Y thành phố Z">
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