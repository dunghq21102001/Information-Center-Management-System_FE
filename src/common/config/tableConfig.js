export default class tableConfig {
    static userTable() {
        return [
            { text: "Username", value: "userName", sortable: true },
            { text: "Full Name", value: "fullName", sortable: true, width: 200 },
            { text: "Email", value: "email", sortable: true, width: 250 },
            { text: "Role", value: "roleName", sortable: true},
            { text: "Gender", value: "genderType", sortable: true },
            { text: "Avatar", value: "avatar", sortable: true },
            { text: "Phone", value: "phone", sortable: true },
            { text: "Date Of Birth", value: "dateOfBirth", sortable: true, width: 200 },
            { text: "Bank Name", value: "bankName", sortable: true, width: 200 },
            { text: "Bank Account Number", value: "bankAccountNumber", sortable: true, width: 250 },
            { text: "Bank Account Name", value: "bankAccountName", sortable: true, width: 200 },
            { text: "Address", value: "address", sortable: true, width: 400 },
            { text: "Status", value: "status", sortable: true },
            { text: "Action", value: "operation" }
        ]
    }

    static attendanceTable() {
        return [
            { text: "Image", value: "image", sortable: true },
            { text: "Full Name", value: "fullName", sortable: true },
            { text: "Email", value: "email", sortable: true },
            { text: "First In", value: "firstIn", sortable: true },
            { text: "Last Out", value: "lastOut", sortable: true },
            { text: "Shift", value: "shift", sortable: true },
            { text: "Action", value: "operation" }
        ]
    }

    static trainingProgramTable() {
        return [
            { text: "Code", value: "trainingProgramCode", sortable: true, },
            { text: "Name", value: "trainingProgramName", sortable: true, width: 200 },
            { text: "Price", value: "Price", sortable: true },
            { text: "Image", value: "image", sortable: true },
            { text: "Action", value: "operation" }
        ]
    }

    static locationTable() {
        return [
            { text: "Name", value: "name", sortable: true },
            { text: "Address", value: "address", sortable: true, width: 300 },
            { text: "Action", value: "operation" }
        ]
    }

    static roomTable() {
        return [
            { text: "Name", value: "name", sortable: true },
            { text: "Status", value: "status", sortable: true, width: 300 },
            { text: "Action", value: "operation" }
        ]
    }

    static tpCategoryTable() {
        return [
            { text: "Name", value: "name", sortable: true, width: 200 },
            { text: "Learning Age", value: "learningAge", sortable: true, width: 300 },
            { text: "Description", value: "description", sortable: true, width: 300 },
            { text: "Action", value: "operation" }
        ]
    }

    static blogTable() {
        return [
            { text: "Title", value: "title", sortable: true },
            { text: "Image", value: "image", sortable: true, width: 300 },
            // { text: "Content", value: "content", sortable: true, width: 900 },
            { text: "Action", value: "operation" }
        ]
    }

    static semesterTable() {
        return [
            { text: "Semester Name", value: "semesterName", sortable: true },
            { text: "Start Date", value: "startDate", sortable: true, width: 200 },
            { text: "End Date", value: "endDate", sortable: true, width: 200 },
            // { text: "Action", value: "operation" }
        ]
    }


    static tagTable() {
        return [
            { text: "Tag Name", value: "tagName", sortable: true },
            { text: "Description", value: "description", sortable: true, width: 300 },
            { text: "Action", value: "operation" }
        ]
    }

    static courseTable() {
        return [
            { text: "Code", value: "courseCode", sortable: true },
            { text: "Price", value: "price", sortable: true },
            { text: "Name", value: "name", sortable: true, width: 200 },
            { text: "Image", value: "image", sortable: true },
            { text: "Duration Total", value: "durationTotal", sortable: true, width: 200 },
            { text: "Syllabus", value: "syllabus", sortable: true },
            { text: "Discount", value: "discount", sortable: true },
            { text: "Level", value: "level", sortable: true },
            { text: "Entry Point", value: "entryPoint", sortable: true },
            { text: "Description", value: "description", sortable: true, width: 300 },
            { text: "Action", value: "operation" }
        ]
    }

    static categoryEquipmentTable() {
        return [
            { text: "Name", value: "name", sortable: true, width: 200 },
            { text: "Description", value: "description", sortable: true },
            { text: "Created Date", value: "creationDate", sortable: true, width: 200 },
            { text: "Action", value: "operation" }
        ]
    }
}