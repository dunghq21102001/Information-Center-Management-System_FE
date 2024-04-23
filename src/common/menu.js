export default class menu {
    static sidebarMenu(userRole) {
        const menuItems = [
            {
                id: 74216, name: 'Yêu cầu tư vấn', icon: 'fa-tasks', subTab: [
                    { name: 'Thêm yêu cầu', url: 'advice-create' },
                    { name: 'Danh sách yêu cầu', url: 'advice-request' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager', 'Staff']
            },
            {
                id: 6, name: 'Lịch', icon: 'md-taskalt', subTab: [
                    { name: 'Lịch', url: 'today-attendance' },
                    { name: 'User Attendance', url: 'user-attendance' },
                ], isShow: false, isActive: false, isHidden: false, roles: []
            },
            {
                id: 10, name: 'Tin tức', icon: 'hi-newspaper', subTab: [
                    { name: 'Thêm tin tức', url: 'blog-create' },
                    { name: 'Danh sách tin tức', url: 'blogs' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager']
            },
            {
                id: 3, name: 'Trò chuyện', icon: 'bi-chat-dots-fill', subTab: [
                    { name: 'Trò chuyện', url: 'chat' },
                    // { name: 'Anonymous chat', url: 'anonymous-chat' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager', 'Staff', 'Teacher', 'Parent']
            },
            {
                id: 4, name: 'Calendar', icon: 'bi-calendar-week', subTab: [
                    { name: 'My Calendar', url: 'my-calendar' },
                    // { name: 'User Calendar', url: 'user-calendar' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Teacher']
            },
            {
                id: 5, name: 'Lớp học', icon: 'si-googleclassroom', subTab: [
                    { name: 'Thêm lớp', url: 'class-create' },
                    { name: 'Danh sách lớp', url: 'classes' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager', 'Staff', 'Teacher']
            },
            {
                id: 7, name: 'Khoá học', icon: 'si-coursera', subTab: [
                    { name: 'Thêm khoá học', url: 'course-create' },
                    { name: 'Danh sách khoá học', url: 'courses' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Staff', 'Teacher']
            },
            {
                id: 2, name: 'Hợp đồng', icon: 'fa-file-contract', subTab: [
                    { name: 'Danh sách hợp đồng', url: 'contract' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager']
            },
            // {
            //     id: 3, name: 'Payroll', icon: 'la-money-check-alt-solid', subTab: [
            //         { name: 'Salary', url: 'salary' },
            //     ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager']
            // },
            // {
            //     id: 41, name: 'Semester', icon: 'bi-diagram-3-fill', subTab: [
            //         { name: 'Add Semester', url: 'semester-create' },
            //         { name: 'Semesters', url: 'semesters' },
            //     ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager']
            // },
            // {
            //     id: 71, name: 'Training Program', icon: 'gi-bookshelf', subTab: [
            //         { name: 'Add TP', url: 'training-program-create' },
            //         { name: 'Training Program', url: 'training-program' },
            //     ], isShow: false, isActive: false, isHidden: false, roles: ['Admin']
            // },
            // {
            //     id: 76, name: 'Divisions', icon: 'md-imageaspectratio-sharp', subTab: [
            //         { name: 'Add Division', url: 'division-create' },
            //         { name: 'Divisions', url: 'divisions' },
            //     ], isShow: false, isActive: false, isHidden: false, roles: ['Admin']
            // },
            {
                id: 2145, name: 'Ghi danh', icon: 'gi-archive-register', subTab: [
                    { name: 'Danh sách ghi danh', url: 'enrollment' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Staff']
            },
            {
                id: 9, name: 'Trang thiết bị', icon: 'px-devices', subTab: [
                    { name: 'Thêm thiết bị', url: 'equipment-create' },
                    { name: 'Danh sách thiết bị', url: 'equipments' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager']
            },
            // {
            //     id: 72, name: 'Lessons', icon: 'md-playlesson-round', subTab: [
            //         { name: 'Add Lesson', url: 'lesson-create' },
            //         { name: 'Lessons', url: 'lessons' },
            //     ], isShow: false, isActive: false, isHidden: false, roles: ['Admin']
            // },
            {
                id: 8, name: 'Khu vực', icon: 'io-location-sharp', subTab: [
                    { name: 'Thêm khu vực', url: 'location-create' },
                    { name: 'Danh sách khu vực', url: 'locations' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin']
            },
            {
                id: 7, name: 'Đơn hàng', icon: 'bi-box-seam', subTab: [
                    { name: 'Danh sách đơn hàng', url: 'order-list' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Staff']
            },
            {
                id: 1, name: 'Người dùng', icon: 'hi-user-group', subTab: [
                    { name: 'Thêm người dùng', url: 'user-create' },
                    { name: 'Danh sách người dùng', url: 'users' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager', 'Staff']
            },
            {
                id: 5, name: 'Phòng học', icon: 'co-room', subTab: [
                    { name: 'Thêm phòng', url: 'room-create' },
                    { name: 'Danh sách phòng', url: 'rooms' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager']
            },
            // {
            //     id: 751, name: 'Questions', icon: 'bi-question-circle-fill', subTab: [
            //         { name: 'Add Question', url: 'question-create' },
            //         { name: 'Questions', url: 'questions' },
            //     ], isShow: false, isActive: false, isHidden: false, roles: ['Admin']
            // },
            // {
            //     id: 726, name: 'Documents', icon: 'hi-document-text', subTab: [
            //         { name: 'Add Document', url: 'document-create' },
            //         { name: 'Documents', url: 'documents' },
            //     ], isShow: false, isActive: false, isHidden: false, roles: ['Admin']
            // },
            {
                id: 9, name: 'Báo cáo', icon: 'hi-solid-document-report', subTab: [
                    { name: 'Xuất báo cáo', url: 'reports' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager']
            },
            {
                id: 11, name: 'Cài đặt', icon: 'io-settings-sharp', subTab: [
                    { name: 'Hệ thống', url: 'settings' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager']
            },
        ]

        menuItems.forEach(item => {
            item.isHidden = !item.roles.includes(userRole);
        });
        return menuItems
    }



    static parentProfileMenu() {
        return [
            { name: 'Thông tin chung', index: 1 },
            { name: 'Bảo mật và giao dịch', index: 2 },
            { name: 'Danh sách trẻ', index: 3 },
            // { name: 'Bảng trả góp', index: 4 },
            { name: 'Các yêu cầu', index: 4 },
            // { name: 'Lịch', index: 6 },
            // { name: 'Schedules', index: 7 },
        ]
    }

    static staffProfileMenu() {
        return [
            { name: 'Thông tin chung', index: 1 },
            { name: 'Bảo mật', index: 2 },
            // { name: 'Danh sách trẻ', index: 3 },
            // { name: 'Bảng trả góp', index: 4 },
            { name: 'Các yêu cầu', index: 4 },
            // { name: 'Lịch', index: 6 },
        ]
    }

    static welcomeMenu() {
        return [
            { name: 'Home', index: 0 },
            // { name: 'Training Program', index: 1 },
            { name: 'Blogs', index: 2 },
            // { name: 'Outstanding Students', index: 3 },

        ]
    }
}