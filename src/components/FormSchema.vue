<template>
    <div class="w-full flex flex-wrap justify-between items-start">
        <FormKitSchema :schema="schema" />
    </div>
</template>
<script>
import { FormKitSchema } from '@formkit/vue'
export default {
    props: {
        schema: Array
    },
    data() {
        return {
        }
    }
}
</script>
<style scoped>

</style>