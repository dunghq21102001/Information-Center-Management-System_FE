<template>
    <div class="w-full">
        <p class="page-sub-title">Children</p>
        <!-- <div class="grid grid-cols-12 gap-4">
            <div v-for="item in listCourse" class="col-span-12 md:col-span-4">
                <CourseCard :item="item" />
            </div>
        </div>
        <div class="w-full mx-auto mt-5 md:w-[60%]">
            <Pagination />
        </div> -->

        <div class="w-full">
        </div>

    </div>
</template>
<script>
import CourseCard from '../CourseCard.vue';
import Pagination from '../Pagination.vue';
export default {
    props: {},
    components: {
        CourseCard,
        Pagination
    },
    data() {
        return {
            listCourse: [
                {
                    name: 'Webflow 101 crash course',
                    img: 'https://quicklearn.pk/assets/img/courses/2.jpg',
                    lesson: 25
                },
                {
                    name: 'Web Development Course in Karachi',
                    img: 'https://axcoreacademy.com/wp-content/uploads/2020/01/SKhsnA.png',
                    lesson: 72
                },
                {
                    name: 'Web Course training',
                    img: 'https://img.freepik.com/premium-vector/online-presentation-concept-illustration_516005-71.jpg',
                    lesson: 38
                },
                {
                    name: 'Page 7 | Course Website Images - Free Download on Freepik',
                    img: 'https://img.freepik.com/free-vector/online-courses-programs-isometric-landing-page-equipment-distant-education-internet-studying_107791-3441.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699401600&semt=ais',
                    lesson: 10
                },
            ]
        }
    },
    created() { },
    methods: {}
}
</script>