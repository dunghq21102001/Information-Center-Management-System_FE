<template>
    <div class="w-full">
        <div class="w-[90%] mx-auto">
            <NormalTable :is-show-search="true" :data="data" :header="header" :is-update="false" :is-delete="true" />
        </div>
    </div>
</template>
<script>
import NormalTable from '../../components/NormalTable.vue'
import tableConfig from '../../common/config/tableConfig'

export default {
    props: {},
    components: {
        NormalTable
    },
    data() {
        return {
            header: tableConfig.attendanceTable(),
            data: [
                {
                    image: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
                    fullName: 'Nguyen Van A',
                    email: 'anv12345@gmail.com',
                    firstIn: '10:30',
                    lastOut: '19:39',
                    shift: 'Day shift'
                },
                {
                    image: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
                    fullName: 'Nguyen Van A',
                    email: 'anv12345@gmail.com',
                    firstIn: '10:30',
                    lastOut: '19:39',
                    shift: 'Day shift'
                },
                {
                    image: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
                    fullName: 'Nguyen Van A',
                    email: 'anv12345@gmail.com',
                    firstIn: '10:30',
                    lastOut: '19:39',
                    shift: 'Day shift'
                },
                {
                    image: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
                    fullName: 'Nguyen Van A',
                    email: 'anv12345@gmail.com',
                    firstIn: '10:30',
                    lastOut: '19:39',
                    shift: 'Day shift'
                },
                {
                    image: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
                    fullName: 'Nguyen Van A',
                    email: 'anv12345@gmail.com',
                    firstIn: '10:30',
                    lastOut: '19:39',
                    shift: 'Day shift'
                },
            ],
            searchQuery: '',
            searchFields: ['img', 'fullName', 'number', 'p', 'indicator.height', 'lastAttended']
        }
    },
    created() { },
    methods: {}
}
</script>