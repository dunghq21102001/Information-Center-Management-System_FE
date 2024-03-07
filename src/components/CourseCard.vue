<template>
    <div class="w-full">
        <div class="w-full h-[200px] flex items-center justify-center overflow-hidden">
            <img :src='itemProp?.img' class="cursor-pointer w-full object-cover">
        </div>
        <p class="text-[20px] cursor-pointer hover:underline hover:text-[#007d88]">{{ itemProp?.name }}</p>
        <p class="text-gray-500">{{ itemProp?.lesson }} lessons</p>
    </div>
</template>
<script>
export default {
    props: {
        item: Object
    },
    data() {
        return {
          itemProp: this.item
        }
    },
    created() { },
    methods: {

    }
}
</script>