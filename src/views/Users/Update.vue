<template>
    <div class="w-full"></div>
</template>
<script>
export default {
    props: {},
    data() {
        return {
        }
    },
    created() {
        this.getDetail()
    },
    methods: {
        getDetail() {
            console.log(this.$route.params.id);
        }
    }
}
</script>