<template>
    <div class="w-full pb-10">
        <div class="w-[95%] mx-auto mb-4 mt-8">
            <select class="select-primary px-4 py-1 w-[200px]" name="" id="">
                <option value="">Manager</option>
                <option value="">Staff</option>
                <option value="">Teacher</option>
                <option value="">Children</option>
            </select>
        </div>
        <FormSchema :schema="userSchema" btn-name="Add" @form-submitted="handleAddUser"/>
    </div>
</template>
<script>
import FormSchema from '../../components/FormSchema.vue';
import schemaConfig from '../../common/config/schemaConfig';
export default {
    props: {},
    components: { FormSchema },
    data() {
        return {
            userSchema: schemaConfig.userSchema()
        }
    },
    created() { },
    methods: {
        handleAddUser(formData) {
      console.log('Form submitted:', formData);
    },
    }
}
</script>