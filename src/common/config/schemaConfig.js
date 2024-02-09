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

    static TrainingProgramSchema() {
        return [
            { title: 'Code', field: 'trainingProgramCode', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Name', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Price', field: 'price', value: '0', type: 'number', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 1 },
            { title: 'Image', field: 'image', value: '', type: 'image', focus: false, error: false, errMes: 'This data field cannot be blank!', w: 2 },
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