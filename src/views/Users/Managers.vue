<template>
    <div class="w-full">
        <div class="w-[90%] mx-auto">
            <NormalTable :data="data" :header="header" :is-show-search="true" :is-update="true" :is-delete="true" />
        </div>
    </div>
</template>
<script>
import tableConfig from '../../common/config/tableConfig'
import NormalTable from '../../components/NormalTable.vue';
export default {
    components: {
        NormalTable
    },
    data() {
        return {
            header: tableConfig.managerTable(),
            data: [
                { player: "Stephen Curry", team: "GSW", number: 30, position: 'G', indicator: { "height": '6-2', "weight": 185 }, lastAttended: "Davidson", country: "USA" },
                { player: "Lebron James", team: "LAL", number: 6, position: 'F', indicator: { "height": '6-9', "weight": 250 }, lastAttended: "St. Vincent-St. Mary HS (OH)", country: "USA" },
                { player: "Kevin Durant", team: "BKN", number: 7, position: 'F', indicator: { "height": '6-10', "weight": 240 }, lastAttended: "Texas-Austin", country: "USA" },
            ],
        }
    },
    methods: {
    },
    created() { }
}
</script>