export default class schemaConfig {
    static userSchema(genderData = [], roleData = [], jobType = [], locations = []) {
        return [
            { title: 'Họ và tên', field: 'fullName', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Tên đăng nhập', field: 'userName', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Email', field: 'email', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Giới tính', field: 'genderType', value: 'Nam', type: 'radio', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: genderData },
            { title: 'Điện thoại', field: 'phone', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Sinh nhật', field: 'dateOfBirth', value: '', type: 'date', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Vị trí', field: 'roleId', value: roleData[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: roleData },
            { title: 'Địa chỉ', field: 'address', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Khu vực', field: 'locationId', value: locations[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: locations },
            { title: 'Ảnh đại diện', field: 'avatar', value: '', type: 'image', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            { title: 'Mã hợp đồng', field: 'contractCodeTmp', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Loại hợp đồng', field: 'configJobTypeIdTmp', value: jobType[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: jobType },
            { title: 'Ngày bắt đầu', field: 'startDateTmp', value: '', type: 'date', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Ngày kết thúc', field: 'endDateTmp', value: '', type: 'date', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Công việc', field: 'jobTmp', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'File hợp đồng', field: 'fileTmp', value: '', type: 'file', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
        ]
    }

    static childrenSchema() {
        return [
            { title: 'Họ và tên', field: 'fullName', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Birthday', field: 'birthDay', value: '', type: 'date', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Special Skill', field: 'specialSkill', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Giới tính', field: 'genderType', value: 'Nam', type: 'radio', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: ['Nam', 'Nữ'] },
            // { title: 'Gender', field: 'genderType', value: '', type: 'radio', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: genderData },
            { title: 'Avatar', field: 'avatar', value: '', type: 'image', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
        ]
    }

    static TrainingProgramSchema(tpCate) {
        return [
            { title: 'Code', field: 'trainingProgramCode', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Name', field: 'trainingProgramName', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Price', field: 'price', value: '0', type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Category', field: 'trainingProgramCategoryId', value: tpCate[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: tpCate },
            { title: 'Image', field: 'image', value: '', type: 'image', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
        ]
    }

    static adviceRequest(locations = [], testData = [], slotData = []) {
        return [
            { title: 'Họ và tên', field: 'fullName', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Email', field: 'email', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Điện thoại', field: 'phone', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Thi đầu vào', field: 'tested', value: 'False', type: 'radio', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: testData },
            // { title: 'Khu vực', field: 'locationId', value: locations[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: locations },
            { title: 'Thời gian bắt đầu', field: 'slotId', value: slotData[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: slotData },
            { title: 'Ngày hẹn', field: 'testDate', value: '', type: 'date', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: slotData },
            { title: 'Địa chỉ', field: 'address', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },

        ]
    }

    static TrainingProgramCategorySchema() {
        return [
            { title: 'Name', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Learning Age', field: 'learningAge', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Description', field: 'description', value: '', type: 'textarea', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
        ]
    }

    static contractSchema(jobType = []) {
        return [
            { title: 'Mã hợp đồng', field: 'contractCode', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Loại hợp đồng', field: 'configJobTypeId', value: jobType[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: jobType },
            { title: 'Ngày bắt đầu', field: 'startDate', value: '', type: 'date', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Ngày kết thúc', field: 'endDate', value: '', type: 'date', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Công việc', field: 'job', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'File hợp đồng', field: 'file', value: '', type: 'file', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            // { title: 'Trạng thái hợp đồng', field: 'statusOfContract', value: '', type: 'file', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
        ]
    }

    static locationSchema() {
        return [
            { title: 'Tên khu vực', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            { title: 'Địa chỉ', field: 'address', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
        ]
    }

    static semesterSchema() {
        return [
            { title: 'Semester Name', field: 'semesterName', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            { title: 'startDate', field: 'startDate', value: '', type: 'date', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'End Date', field: 'endDate', value: '', type: 'date', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
        ]
    }

    static blogSchema(tags) {
        return [
            { title: 'Tiêu đề', field: 'title', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Nhãn', field: 'tags', value: [], type: 'multiSelect', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: tags },
            { title: 'Ảnh', field: 'image', value: '', type: 'image', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            { title: 'Nội dung', field: 'content', value: '', type: 'quill', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
        ]
    }

    static tagSchema() {
        return [
            { title: 'Nhãn', field: 'tagName', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            { title: 'Mô tả', field: 'description', value: '', type: 'textarea', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
        ]
    }

    static roomSchema(status = []) {
        return [
            { title: 'Tên', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Trạng thái', field: 'status', value: status[0]?.value, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: status },
        ]
    }


    static categoryEquipmentSchema() {
        const type = [
            { id: 1, name: 'Đơn' },
            { id: 2, name: 'Bộ' },

        ]
        return [
            { title: 'Tên', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            // { title: 'Số lượng', field: 'quantity', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Loại thiết bị', field: 'typeCategoryEquipment', value: type[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: type },
            { title: 'Mô tả', field: 'description', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
        ]
    }

    static divisionSchema() {
        return [
            { title: 'Tên', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            { title: 'Mô tả', field: 'description', value: '', type: 'textarea', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
        ]
    }

    static lessonSchema(equipments) {
        return [
            { title: 'Tên', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            { title: 'Thời gian (slot)', field: 'duration', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2, isBlock: false },
            { title: 'Bài thực hành', field: 'isPractice', value: false, type: 'checkboxc', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2, isGroup: false, valueOfGroupSize: 0, listData: equipments, valueOfEquipments: [] },
            { title: 'Mô tả', field: 'description', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
        ]
    }

    static resourceSchema() {
        return [
            { title: 'Tệp', field: 'file', value: 0, type: 'file', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            { title: 'Mô tả', field: 'description', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
        ]
    }

    static questionSchema(lessons = []) {
        return [
            { title: 'Bài học', field: 'lessionId', value: lessons[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2, listData: lessons },
            { title: 'Câu hỏi', field: 'title', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            { title: 'Đáp án 1', field: 'answer1', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Đáp án 2', field: 'answer2', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Đáp án 3', field: 'answer3', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Đáp án 4', field: 'answer4', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Đáp án đúng', field: 'rightAnswer', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Cấp độ câu hỏi', field: 'level', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
        ]
    }

    static enrollmentSchema() {
        return [

        ]
    }

    static classSchema(courses = [], slots = [], dayInWeek = []) {

        return [
            { title: 'Mã lớp', field: 'classCode', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Khoá học', field: 'courseId', value: courses[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: courses },
            // { title: 'Kỳ', field: 'semesterId', value: semesters[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: semesters },
            { title: 'Ngày bắt đầu', field: 'startDate', value: '', type: 'date', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Ngày kết thúc', field: 'endDate', value: '', type: 'date', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Số trẻ tối đa', field: 'maxNumber', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Số trẻ dự kiến', field: 'expectedNumber', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Thời gian bắt đầu', field: 'slotId', value: slots[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: slots },
            {
                title: 'Thứ trong tuần', field: 'dayInWeek', value: [], type: 'multiSelectV2', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: [
                    { value: 0, beData: 'Sunday', tagName: 'Chủ Nhật' },
                    { value: 1, beData: 'Monday', tagName: 'Thứ 2' },
                    { value: 2, beData: 'Tuesday', tagName: 'Thứ 3' },
                    { value: 3, beData: 'Wednesday', tagName: 'Thứ 4' },
                    { value: 4, beData: 'Thursday', tagName: 'Thứ 5' },
                    { value: 5, beData: 'Friday', tagName: 'Thứ 6' },
                    { value: 6, beData: 'Saturday', tagName: 'Thứ 7' },
                ]
            },
        ]
    }

    static equipmentSchema(categoryList = [], roomList = [], status = []) {
        return [
            { title: 'Danh mục', field: 'categoryEquipmentId', value: categoryList[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: categoryList },
            // { title: 'room', field: 'roomId', value: roomList[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: roomList },
            { title: 'Tên thiết bị', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            // { title: 'Mã', field: 'code', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Giá', field: 'price', value: '', type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Trạng thái', field: 'status', value: status[0]?.value, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1, listData: status },
            { title: 'Ngày mua', field: 'purchaseDate', value: '', type: 'date', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Hạn bảo hành', field: 'warrantyPeriod', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
        ]
    }

    static courseSingleSchema(courses = [], type = []) {
        return [
            { title: 'Mã', field: 'courseCode', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Tên khoá học', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Giá', field: 'price', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Tổng số slot', field: 'durationTotal', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Điểm đầu vào', field: 'entryPoint', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Cấp độ', field: 'level', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Từ độ tuổi', field: 'fromAge', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Đến độ tuổi', field: 'toAge', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Mô tả', field: 'description', value: '', type: 'textarea', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            // { title: 'Môn tiên quyết', field: 'prerequisite', value: courses[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2, listData: courses },
            // { title: 'Loại khoá học', field: 'courseType', value: type[0]?.value, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2, listData: type },
            { title: 'Syllabus', field: 'syllabus', value: '', type: 'file', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            { title: 'Ảnh', field: 'image', value: '', type: 'image', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
        ]
    }

    static courseChildrenSchema(courses = [], type = []) {
        return [
            { title: 'Mã', field: 'courseCode', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Tên khoá học', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Giá', field: 'price', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Tổng số slot', field: 'durationTotal', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            // { title: 'Điểm đầu vào', field: 'entryPoint', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Cấp độ', field: 'level', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Mô tả', field: 'description', value: '', type: 'textarea', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            // { title: 'Môn tiên quyết', field: 'prerequisite', value: courses[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2, listData: courses },
            // { title: 'Loại khoá học', field: 'courseType', value: type[0]?.value, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2, listData: type },
            // { title: 'Syllabus', field: 'syllabus', value: '', type: 'file', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            { title: 'Ảnh', field: 'image', value: '', type: 'image', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
        ]
    }

    static courseSpecSchema(courses = [], type = []) {
        return [
            { title: 'Mã', field: 'courseCode', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Tên khoá học', field: 'name', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            // { title: 'Giá', field: 'price', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            // { title: 'Tổng số slot', field: 'durationTotal', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Điểm đầu vào', field: 'entryPoint', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Cấp độ', field: 'level', value: '', type: 'text', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Từ độ tuổi', field: 'fromAge', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Đến độ tuổi', field: 'toAge', value: 0, type: 'number', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 1 },
            { title: 'Mô tả', field: 'description', value: '', type: 'textarea', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            // { title: 'Môn tiên quyết', field: 'prerequisite', value: courses[0]?.id, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2, listData: courses },
            // { title: 'Loại khoá học', field: 'courseType', value: type[0]?.value, type: 'select', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2, listData: type },
            { title: 'Syllabus', field: 'syllabus', value: '', type: 'file', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
            { title: 'Ảnh', field: 'image', value: '', type: 'image', focus: false, error: false, errMes: 'Không được bỏ trống!', w: 2 },
        ]
    }
}