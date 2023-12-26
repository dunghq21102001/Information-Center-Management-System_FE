export default class schemaConfig {
    static userSchema() {
        return [
            { title: 'Full name', field: 'fullName', value: '', type: 'text', focus: false, error: false, w: 1 },
            { title: 'User name', field: 'userName', value: '', type: 'text', focus: false, error: false, w: 1 },
            { title: 'Email', field: 'email', value: '', type: 'text', focus: false, error: false, w: 1 },
            { title: 'Age', field: 'age', value: '0', type: 'number', focus: false, error: false, w: 1 },
            { title: 'Address', field: 'address', value: '', type: 'text', focus: false, error: false, w: 2 },
            { title: 'Description', field: 'description', value: '', type: 'textarea', focus: false, error: false, w: 2 },
            { title: 'Avatar', field: 'avatar', value: '', type: 'image', focus: false, error: false, w: 2 },
            { title: 'Background', field: 'background', value: '', type: 'image', focus: false, error: false, w: 2 },
        ]
    }

    static courseSchema() {
        return [
            { title: 'Title', field: 'title', value: '', type: 'text', focus: false, error: false, w: 1 },
            { title: 'Total Lesson', field: 'totalLesson', value: '0', type: 'number', focus: false, error: false, w: 1 },
            { title: 'Total Slot', field: 'totalSlot', value: '0', type: 'number', focus: false, error: false, w: 1 },
            { title: 'Description', field: 'description', value: '', type: 'textarea', focus: false, error: false, w: 2 },
            { title: 'Certificate', field: 'certificate', value: '', type: 'file', focus: false, error: false, w: 2 },
            { title: 'Image', field: 'image', value: '', type: 'image', focus: false, error: false, w: 2 },
        ]
    }
}