export default class tableConfig {
    static userTable() {
        return [
            { text: "Tài khoản", value: "userName", sortable: true },
            // { text: "Full Name", value: "fullName", sortable: true },
            // { text: "Email", value: "email", sortable: true },
            { text: "Vị trí", value: "roleName", sortable: true },
            { text: "Giới tính", value: "genderType", sortable: true },
            // { text: "Avatar", value: "avatar", sortable: true },
            { text: "Phone", value: "phone", sortable: true },
            // { text: "Sinh nhật", value: "dateOfBirth", sortable: true, width: 150 },
            // { text: "Bank Name", value: "bankName", sortable: true },
            // { text: "Bank Account Number", value: "bankAccountNumber", sortable: true},
            // { text: "Bank Account Name", value: "bankAccountName", sortable: true },
            // { text: "Address", value: "address", sortable: true },
            { text: "Trạng thái", value: "status", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }

    static attendanceTable() {
        return [
            { text: "Ảnh", value: "image", sortable: true },
            { text: "Họ tên", value: "fullName", sortable: true },
            { text: "Email", value: "email", sortable: true },
            { text: "First In", value: "firstIn", sortable: true },
            { text: "Last Out", value: "lastOut", sortable: true },
            { text: "Shift", value: "shift", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }

    static prepareTable() {
        return [
            { text: "Mã lớp", value: "classCode", sortable: true },
            { text: "Giáo viên", value: "nameTeacher", sortable: true },
            { text: "Buổi học", value: "slot", sortable: true },
            { text: "Chi tiết", value: "detail" },
            // { text: "Hành động", value: "operation" }
        ]
    }


    static childrenTable() {
        return [
            { text: "Mã số", value: "childrenCode", sortable: true, },
            { text: "Họ tên", value: "fullName", sortable: true, },
            { text: "Giới tính", value: "genderType", sortable: true },
            { text: "Sinh nhật", value: "birthDay", sortable: true },
            { text: "Kỹ năng", value: "specialSkill", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }

    static trainingProgramTable() {
        return [
            { text: "Mã", value: "trainingProgramCode", sortable: true, },
            { text: "Tên", value: "trainingProgramName", sortable: true },
            { text: "Giá", value: "Price", sortable: true },
            { text: "Ảnh", value: "image", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }

    static locationTable() {
        return [
            { text: "Tên", value: "name", sortable: true },
            { text: "Địa chỉ", value: "address", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }

    static roomTable() {
        return [
            { text: "Tên", value: "name", sortable: true },
            { text: "Trạng thái", value: "status", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }

    static tpCategoryTable() {
        return [
            { text: "Name", value: "name", sortable: true },
            { text: "Learning Age", value: "learningAge", sortable: true },
            { text: "Description", value: "description", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }

    static examByClassTable() {
        return [
            { text: "Tên bài thực hành", value: "testName", sortable: true },
            { text: "Mã bài thực hành", value: "testCode", sortable: true },
            { text: "Ngày thực hành", value: "testDate", sortable: true },
            { text: "Thời gian", value: "testDuration" }
        ]
    }

    static transactionTable() {
        return [
            { text: "Mã khoá học", value: "courseName", sortable: true },
            { text: "Kì hạn", value: "installmentTerm", sortable: true },
            { text: "Ngày trả", value: "payDate", sortable: true },
            { text: "Trạng thái", value: "statusTransaction" },
            { text: "Chi tiết", value: "detail", width: 90 },
        ]
    }

    static transactionDetailTable() {
        return [
            { text: "Mã khoá học", value: "courseName", sortable: true },
            { text: "Tổng tiền", value: "totalAmount", sortable: true },
            // { text: "Kì hạn", value: "installmentTerm", sortable: true },
            { text: "Hạn thanh toán", value: "installmentPeriod", sortable: true },
            // { text: "Ngày trả", value: "payDate", sortable: true },
            { text: "Trạng thái", value: "statusTransaction" },
            // { text: "Chi tiết", value: "detail", width: 90 },
        ]
    }

    // "id": "6ad8b0f7-3890-41bc-a415-331417c53b96",
    // "bankingAccountNumber": null,
    // "bankingNumber": null,
    // "bankName": null,
    // "courseName": "Khoá học đơn cơ bản",
    // "totalAmount": 3500000,
    // "message": null,
    // "payDate": null,
    // "installmentTerm": null,
    // "installmentPeriod": "2024-04-22T15:38:02.4820082",
    // "statusTransaction": "Successfully"

    static blogTable() {
        return [
            { text: "Title", value: "title", sortable: true },
            // { text: "Image", value: "image", sortable: true },
            // { text: "Content", value: "content", sortable: true, width: 900 },
            { text: "Hành động", value: "operation" }
        ]
    }

    static contractTable() {
        return [
            { text: "Mã hợp đồng", value: "contractCode", sortable: true },
            // { text: "Công việc", value: "job", sortable: true },
            { text: "Ngày bắt đầu", value: "startDate", sortable: true },
            { text: "Ngày kết thúc", value: "endDate", sortable: true },
            { text: "Hợp đồng", value: "file", sortable: true },
            { text: "Trạng thái", value: "statusOfContract", sortable: true },
            // { text: "contractCode", value: "contractCode", sortable: true },
            // { text: "Image", value: "image", sortable: true },
            // { text: "Content", value: "content", sortable: true, width: 900 },
            { text: "Hành động", value: "operation" }
        ]
    }

    static semesterTable() {
        return [
            { text: "Tên", value: "name", sortable: true },
            { text: "Ngày bắt đầu", value: "startDate", sortable: true },
            { text: "Ngày kết thúc", value: "endDate", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }


    static tagTable() {
        return [
            { text: "Tên", value: "tagName", sortable: true },
            { text: "Mô tả", value: "description", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }

    static divisionTable() {
        return [
            { text: "Tên", value: "name", sortable: true },
            { text: "Mô tả", value: "description", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }

    static courseTable() {
        return [
            { text: "Mã", value: "courseCode", sortable: true },
            { text: "Tên", value: "name", sortable: true },
            // { text: "Giá", value: "price", sortable: true },
            { text: "Loại", value: "courseType", sortable: true },
            // { text: "Image", value: "image", sortable: true },
            // { text: "Duration Total", value: "durationTotal", sortable: true },
            { text: "Syllabus", value: "syllabus", sortable: true },
            // { text: "Discount", value: "discount", sortable: true },
            // { text: "Level", value: "level", sortable: true },
            // { text: "Entry Point", value: "entryPoint", sortable: true, width: 140 },
            // { text: "Description", value: "description", sortable: true },
            { text: "Chi tiết", value: "detail", width: 90 },
            { text: "Hành động", value: "operation" }
        ]
    }

    static courseSuggestTable() {
        return [
            { text: "Mã", value: "courseCode", sortable: true },
            { text: "Tên", value: "name", sortable: true },
            { text: "Loại", value: "courseType", sortable: true },
            { text: "Syllabus", value: "syllabus", sortable: true },
            { text: "Chi tiết", value: "detail", width: 90 },
        ]
    }

    static courseChildTable() {
        return [
            { text: "Mã", value: "courseCode", sortable: true },
            { text: "Tên", value: "name", sortable: true },
            { text: "Giá", value: "price", sortable: true },
            // { text: "Loại", value: "courseType", sortable: true },
            // { text: "Image", value: "image", sortable: true },
            { text: "Tổng slot", value: "durationTotal", sortable: true },
            // { text: "Syllabus", value: "syllabus", sortable: true },
            // { text: "Discount", value: "discount", sortable: true },
            // { text: "Level", value: "level", sortable: true },
            // { text: "Entry Point", value: "entryPoint", sortable: true, width: 140 },
            // { text: "Description", value: "description", sortable: true },
            // { text: "Chi tiết", value: "detail", width: 90 },
            { text: "Hành động", value: "operation" }
        ]
    }

    static resourceTable() {
        return [
            { text: "Tệp", value: "url", sortable: true },
            { text: "Mô tả", value: "description", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }
    static resourceForChildrenTable() {
        return [
            { text: "Tệp", value: "url", sortable: true },
            { text: "Mô tả", value: "description", sortable: true },
        ]
    }

    static categoryEquipmentTable() {
        return [
            { text: "Tên danh mục", value: "name", sortable: true },
            { text: "Số lượng", value: "quantity", sortable: true },
            { text: "Loại", value: "typeCategoryEquipment", sortable: true },
            { text: "Mô tả", value: "description", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }



    static adviceRequestTable() {
        return [
            { text: "Họ tên", value: "fullName", sortable: true },
            // { text: "Email", value: "email", sortable: true },
            { text: "Điện thoại", value: "phone", sortable: true },
            { text: "Ngày hẹn", value: "startTime", sortable: true },
            // { text: "Khu vực", value: "location", sortable: true },
            { text: "Thi đầu vào", value: "isTested", sortable: true, width: 150 },
            { text: "Nhân viên", value: "staff.userName", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }

    static orderListTable() {
        return [
            { text: "Mã đơn hàng", value: "orderNumber", sortable: true },
            { text: "Khách hàng", value: "fullName", sortable: true },
            { text: "Ngày đặt hàng", value: "orderDate", sortable: true },
            { text: "Tổng tiền", value: "totalAmount", sortable: true },
            { text: "Trạng thái", value: "paymentStatus", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }

    static orderTable() {
        return [
            { text: "Mã đơn hàng", value: "orderId", sortable: true },
            { text: "Tên người dùng", value: "userAccountName", sortable: true },
            { text: "Tổng tiền", value: "totalPrice", sortable: true },
            { text: "Ngày đặt hàng", value: "orderDate", sortable: true },
            { text: "Trạng thái", value: "statusPayment", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }

    static equipmentTable() {
        return [
            { text: "Tên sản phẩm", value: "name", sortable: true },
            // { text: "Mã", value: "code", sortable: true },
            { text: "Giá", value: "price", sortable: true },
            { text: "Ngày mua", value: "purchaseDate", sortable: true },
            { text: "Trạng thái", value: "status", sortable: true },
            // { text: "Hạn bảo hành", value: "warrantyPeriod", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }

    static classTable() {
        return [
            { text: "Mã lớp", value: "classCode", sortable: true },
            { text: "Môn học", value: "courseCode", sortable: true, width: 130 },
            { text: "Số học sinh", value: "actualNumber", sortable: true, width: 130 },
            // { text: "Học sinh tối đa", value: "maxNumber", sortable: true },
            { text: "Ngày bắt đầu", value: "startDate", sortable: true, width: 170 },
            // { text: "Ngày kết thúc", value: "endDate", sortable: true, width: 170 },
            { text: "Trạng thái", value: "statusOfClass", sortable: true },
            { text: 'Chi tiết', value: 'detail', width: 90 },
            { text: "Hành động", value: "operation" }
        ]
    }

    static classByTeacherTable() {
        return [
            { text: "Mã lớp", value: "classCode", sortable: true },
            { text: "Bắt đầu", value: "teachingStartDate", sortable: true, width: 130 },
            { text: "Kết thúc", value: "teachingEndDate", sortable: true, width: 130 },
            { text: "Tổng buổi", value: "totalDuration", sortable: true, width: 170 },
            { text: "Trạng thái", value: "statusOfClass", sortable: true },
            { text: 'Chi tiết', value: 'detail', width: 90 },
            { text: "Hành động", value: "operation" }
        ]
    }

    static childrenInClassTable() {
        return [
            { text: "Mã lớp", value: "code", sortable: true },
            { text: "Mã số", value: "childrenCode", sortable: true },
            { text: "Họ tên", value: "fullName", sortable: true },
            // { text: "Hành động", value: "operation" }
        ]
    }

    static enrollmentTable() {
        return [
            { text: "Mã lớp", value: "classCode", sortable: true },
            { text: "Ngày đăng ký", value: "registerDate", sortable: true },
            { text: "Hoa hồng", value: "commission", sortable: true },
            { text: "Tên học sinh", value: "childrenName", sortable: true },
            // { text: "Hành động", value: "operation" }
        ]
    }

    static requestTable() {
        return [
            { text: "Loại yêu cầu", value: "requestType", sortable: true, width: 150 },
            { text: "Người gửi", value: "creatorName", sortable: true, width: 180 },
            { text: "Mô tả", value: "requestDescription", sortable: true, width: 180 },
            { text: "Ngày nghỉ", value: "leaveDate", sortable: true, width: 150 },
            { text: "Ngày dạy thay", value: "teachingDate", sortable: true, width: 180 },
            { text: "Ngày tạo", value: "creationDate", sortable: true, width: 120 },
            { text: "Trạng thái", value: "status", sortable: true },
            { text: "Hành động", value: "operation" }
        ]
    }
}