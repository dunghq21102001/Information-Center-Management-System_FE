export default class schemaConfig {
    static userSchema(genderData = [], roleData = []) {
        return [
            { title: 'Full name', field: 'fullName', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'User name', field: 'userName', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Email', field: 'email', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Gender', field: 'genderType', value: '', type: 'radio', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1, listData: genderData },
            { title: 'Phone', field: 'phone', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Role', field: 'roleId', value: roleData[0]?.id, type: 'select', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1, listData: roleData },
            { title: 'Address', field: 'address', value: '', type: 'textarea', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
            { title: 'Avatar', field: 'avatar', value: '', type: 'image', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
        ]
    }
    // {
    //     "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //     "fullName": "string",
    //     "birthDay": "string",
    //     "image": "string",
    //     "specialSkill": "string"
    //   }

    static childrenSchema() {
        return [
            { title: 'Full name', field: 'fullName', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Birthday', field: 'birthDay', value: '', type: 'date', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Special Skill', field: 'specialSkill', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
            // { title: 'Gender', field: 'genderType', value: '', type: 'radio', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1, listData: genderData },
            { title: 'Avatar', field: 'image', value: '', type: 'image', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
        ]
    }

    static TrainingProgramSchema(tpCate) {
        return [
            { title: 'Code', field: 'trainingProgramCode', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Name', field: 'trainingProgramName', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Price', field: 'price', value: '0', type: 'number', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Category', field: 'trainingProgramCategoryId', value: tpCate[0]?.id, type: 'select', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1, listData: tpCate },
            { title: 'Image', field: 'image', value: '', type: 'image', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
        ]
    }

    static TrainingProgramCategorySchema() {
        return [
            { title: 'Name', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Learning Age', field: 'learningAge', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Description', field: 'description', value: '', type: 'textarea', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
        ]
    }

    static locationSchema() {
        return [
            { title: 'Name', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
            { title: 'Address', field: 'address', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
        ]
    }

    static semesterSchema() {
        return [
            { title: 'Semester Name', field: 'semesterName', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
            { title: 'startDate', field: 'startDate', value: '', type: 'date', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'End Date', field: 'endDate', value: '', type: 'date', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
        ]
    }

    static blogSchema(tags) {
        return [
            { title: 'Title', field: 'title', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Tag', field: 'tags', value: [], type: 'multiSelect', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1, listData: tags },
            { title: 'Image', field: 'image', value: '', type: 'image', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
            { title: 'Content', field: 'content', value: '', type: 'quill', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
        ]
    }

    static tagSchema() {
        return [
            { title: 'Tag Name', field: 'tagName', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
            { title: 'Description', field: 'description', value: '', type: 'textarea', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
        ]
    }

    static roomSchema(status = []) {
        return [
            { title: 'Name', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Status', field: 'status', value: status[0]?.value, type: 'select', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1, listData: status },
        ]
    }


    static categoryEquipmentSchema() {
        return [
            { title: 'Name', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
            { title: 'Description', field: 'description', value: '', type: 'textarea', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
        ]
    }

    static divisionSchema() {
        return [
            { title: 'Name', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
            { title: 'Description', field: 'description', value: '', type: 'textarea', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
        ]
    }

    static enrollmentSchema() {
        return [

        ]
    }

    static classSchema(courses = []) {
        return [
            { title: 'Class Code', field: 'classCode', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Course', field: 'courseId', value: courses[0]?.id, type: 'select', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1, listData: courses },
            { title: 'Start Date', field: 'startDate', value: '', type: 'date', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'End Date', field: 'endDate', value: '', type: 'date', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'maxNumber', field: 'maxNumber', value: 0, type: 'number', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'expectedNumber', field: 'expectedNumber', value: 0, type: 'number', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },

        ]
    }

    static equipmentSchema(categoryList = [], roomList = [], status = []) {
        return [
            { title: 'Category', field: 'categoryEquipmentId', value: categoryList[0]?.id, type: 'select', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1, listData: categoryList },
            // { title: 'room', field: 'roomId', value: roomList[0]?.id, type: 'select', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1, listData: roomList },
            { title: 'Name', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Code', field: 'code', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Price', field: 'price', value: '', type: 'number', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Status', field: 'status', value: status[0]?.value, type: 'select', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1, listData: status },
            { title: 'Warranty Date', field: 'warrantyDate', value: '', type: 'date', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
        ]
    }

    static courseSchema(courses = [], type = []) {
        return [
            { title: 'Code', field: 'courseCode', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Name', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Price', field: 'price', value: 0, type: 'number', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Duration Total', field: 'durationTotal', value: 0, type: 'number', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Entry Point', field: 'entryPoint', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Level', field: 'level', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Description', field: 'description', value: '', type: 'textarea', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
            { title: 'Prerequisite', field: 'prerequisite', value: courses[0]?.id, type: 'select', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2, listData: courses },
            { title: 'Course Type', field: 'courseType', value: type[0]?.value, type: 'select', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2, listData: type },
            { title: 'Syllabus', field: 'syllabus', value: '', type: 'file', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
            { title: 'Image', field: 'image', value: '', type: 'image', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
        ]
    }
}