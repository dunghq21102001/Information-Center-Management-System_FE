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

    static equipmentSchema() {
        return [
            { title: 'Code', field: 'code', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Name', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Description', field: 'description', value: '', type: 'textarea', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
        ]
    }

    static courseSchema() {
        return [
            { title: 'Code', field: 'courseCode', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Name', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Price', field: 'price', value: '0', type: 'number', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Duration Total', field: 'durationTotal', value: '0', type: 'number', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            // { title: 'Syllabus', field: 'syllabus', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Level', field: 'level', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Entry Point', field: 'entryPoint', value: '0', type: 'number', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Description', field: 'description', value: '', type: 'textarea', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
            { title: 'Image', field: 'image', value: '', type: 'image', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
        ]
    }
}