<template>
    <div class="w-full my-5">
        <div v-show="isShowSearch" class="w-full flex items-center mb-4">
            <select class="bor-no-r px-2 h-[40px] outline-none" v-model="selectedField">
                <option v-for="item in headerProp" :value="item.value" v-show="item?.text != 'Action'">
                    {{ item.text }}
                </option>
            </select>
            <input v-model="searchQuery" placeholder="search . . ."
                class="w-[180px] md:w-[400px] bor-no-l px-3 outline-none h-[40px]" type="text" />
        </div>
        <div class="w-full flex items-center justify-center">
            <EasyDataTable header-text-direction="center" table-class-name="customize-table" theme-color="#007d88"
                :headers="headerProp" buttons-pagination :items="dataProp" show-index :search-field="selectedField"
                :search-value="searchQuery">
                <template #item-image="item">
                    <div class="w-[100px] h-[100px] overflow-hidden">
                        <img :src="item.image" class="w-full object-fill" alt="img">
                    </div>
                </template>
                <template #item-operation="item">
                    <div class="operation-wrapper flex items-center">
                        <button v-if="isUpdateProp" class="mr-3"><v-icon @click="actionEdit(item)" name="fa-regular-edit"
                                :scale="1.5" fill="#2ae549" /></button>
                        <button v-if="isDeleteProp"><v-icon name="md-delete" :scale="1.5" fill="#e71c1c" /></button>
                    </div>
                </template>
            </EasyDataTable>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        data: {
            type: Array,
            default: []
        },
        header: {
            type: Array,
            default: []
        },
        isShowSearch: Boolean,
        isDelete: Boolean,
        isUpdate: Boolean
    },
    data() {
        return {
            dataProp: this.data,
            headerProp: this.header,
            isUpdateProp: this.isUpdate,
            isDeleteProp: this.isDelete,
            searchQuery: '',
            selectedField: '',
            isShowEdit: false
        }
    },
    created() {
        this.selectedField = this.headerProp[0]?.value || ''
    },
    methods: {
        actionEdit(id) {
            console.log(id);
            this.$router.push({ name: 'user-update', params: { id: id.number } })
        },

    }

}
</script>
<style scoped>
.customize-table {
    width: 100%;
    /* --easy-table-border: 1px solid #445269; */
    /* --easy-table-row-border: 1px solid #445269; */

    --easy-table-header-font-size: 16px;
    --easy-table-header-height: 50px;
    /* --easy-table-header-font-color: #c1cad4; */
    /* --easy-table-header-background-color: #2d3a4f; */

    --easy-table-header-item-padding: 10px 15px;

    /* --easy-table-body-even-row-font-color: #fff; */
    /* --easy-table-body-even-row-background-color: #4c5d7a; */

    /* --easy-table-body-row-font-color: #c0c7d2; */
    /* --easy-table-body-row-background-color: #2d3a4f; */
    --easy-table-body-row-height: 30px;
    --easy-table-body-row-font-size: 14px;

    /* --easy-table-body-row-hover-font-color: #2d3a4f; */
    /* --easy-table-body-row-hover-background-color: #eee; */

    --easy-table-body-item-padding: 10px 15px;

    /* --easy-table-footer-background-color: #2d3a4f;
    --easy-table-footer-font-color: #c0c7d2;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px; */

    --easy-table-rows-per-page-selector-width: 70px;
    /* --easy-table-rows-per-page-selector-option-padding: 10px; */
    /* --easy-table-rows-per-page-selector-z-index: 1; */


    /* --easy-table-scrollbar-track-color: #2d3a4f; */
    /* --easy-table-scrollbar-color: #2d3a4f; */
    /* --easy-table-scrollbar-thumb-color: #4c5d7a; */
    /* --easy-table-scrollbar-corner-color: #2d3a4f; */

    /* --easy-table-loading-mask-background-color: #2d3a4f; */
}

.bor-cus {
    border: 1px solid rgb(227, 227, 227);
}

.bor-no-r {
    border-top: 1px solid rgb(227, 227, 227);
    border-left: 1px solid rgb(227, 227, 227);
    border-bottom: 1px solid rgb(227, 227, 227);
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
}

.bor-no-l {
    border-top: 1px solid rgb(227, 227, 227);
    border-right: 1px solid rgb(227, 227, 227);
    border-bottom: 1px solid rgb(227, 227, 227);
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
}
</style>