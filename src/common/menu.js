export default class menu {
    static sidebarMenu(userRole) {
        const menuItems = [
            {
                id: 1, name: 'Users', icon: 'hi-user-group', subTab: [
                    { name: 'Add User', url: 'user-create' },
                    { name: 'Users', url: 'users' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager', 'Staff']
            },
            {
                id: 2, name: 'Contracts', icon: 'fa-file-contract', subTab: [
                    { name: 'Contracts', url: 'contract' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager', 'Staff', 'Parent']
            },
            // {
            //     id: 3, name: 'Payroll', icon: 'la-money-check-alt-solid', subTab: [
            //         { name: 'Salary', url: 'salary' },
            //     ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager']
            // },
            {
                id: 3, name: 'Chat', icon: 'bi-chat-dots-fill', subTab: [
                    { name: 'Chat', url: 'chat' },
                    // { name: 'Anonymous chat', url: 'anonymous-chat' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager', 'Staff', 'Teacher', 'Parent']
            },
            // {
            //     id: 41, name: 'Semester', icon: 'bi-diagram-3-fill', subTab: [
            //         { name: 'Add Semester', url: 'semester-create' },
            //         { name: 'Semesters', url: 'semesters' },
            //     ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager']
            // },
            {
                id: 4, name: 'Calendar', icon: 'bi-calendar-week', subTab: [
                    { name: 'My Calendar', url: 'my-calendar' },
                    { name: 'User Calendar', url: 'user-calendar' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager', 'Staff', 'Teacher', 'Parent']
            },
            {
                id: 5, name: 'Rooms', icon: 'co-room', subTab: [
                    { name: 'Add Room', url: 'room-create' },
                    { name: 'Rooms', url: 'rooms' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager', 'Teacher']
            },
            {
                id: 5, name: 'Classes', icon: 'si-googleclassroom', subTab: [
                    { name: 'Add Class', url: 'class-create' },
                    { name: 'Classes', url: 'classes' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager', 'Staff', 'Teacher']
            },
            {
                id: 6, name: 'Attendance', icon: 'md-taskalt', subTab: [
                    { name: 'Today Attendance', url: 'today-attendance' },
                    { name: 'User Attendance', url: 'user-attendance' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager', 'Staff', 'Teacher', 'Parent']
            },
            // {
            //     id: 71, name: 'Training Program', icon: 'gi-bookshelf', subTab: [
            //         { name: 'Add TP', url: 'training-program-create' },
            //         { name: 'Training Program', url: 'training-program' },
            //     ], isShow: false, isActive: false, isHidden: false, roles: ['Admin']
            // },
            {
                id: 7, name: 'Courses', icon: 'si-coursera', subTab: [
                    { name: 'Add Course', url: 'course-create' },
                    { name: 'Courses', url: 'courses' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager', 'Staff']
            },
            {
                id: 2145, name: 'Enrollment', icon: 'gi-archive-register', subTab: [
                    { name: 'Enrollment', url: 'enrollment' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Staff']
            },
            // {
            //     id: 72, name: 'Lessons', icon: 'md-playlesson-round', subTab: [
            //         { name: 'Add Lesson', url: 'lesson-create' },
            //         { name: 'Lessons', url: 'lessons' },
            //     ], isShow: false, isActive: false, isHidden: false, roles: ['Admin']
            // },
            {
                id: 76, name: 'Divisions', icon: 'md-imageaspectratio-sharp', subTab: [
                    { name: 'Add Division', url: 'division-create' },
                    { name: 'Divisions', url: 'divisions' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin']
            },
            {
                id: 74216, name: 'Advice Request', icon: 'fa-tasks', subTab: [
                    { name: 'Add Advice', url: 'advice-create' },
                    { name: 'Advice Request', url: 'advice-request' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Staff']
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
                id: 8, name: 'Locations', icon: 'io-location-sharp', subTab: [
                    { name: 'Add Location', url: 'location-create' },
                    { name: 'Locations', url: 'locations' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin']
            },
            {
                id: 10, name: 'Blogs', icon: 'hi-newspaper', subTab: [
                    { name: 'Add Blog', url: 'blog-create' },
                    { name: 'Blogs', url: 'blogs' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager']
            },
            {
                id: 9, name: 'Equipments', icon: 'px-devices', subTab: [
                    { name: 'Add Equipment', url: 'equipment-create' },
                    { name: 'Equipments', url: 'equipments' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager']
            },
            {
                id: 9, name: 'Reports', icon: 'hi-solid-document-report', subTab: [
                    { name: 'Reports', url: 'reports' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin', 'Manager']
            },
            {
                id: 11, name: 'Settings', icon: 'io-settings-sharp', subTab: [
                    { name: 'System', url: 'settings' },
                ], isShow: false, isActive: false, isHidden: false, roles: ['Admin']
            },
        ]

        menuItems.forEach(item => {
            item.isHidden = !item.roles.includes(userRole);
        });
        return menuItems
    }



    static userProfileMenu() {
        return [
            { name: 'General information', index: 1 },
            { name: 'Security', index: 2 },
            { name: 'Children', index: 3 },
            { name: 'Installment', index: 4 },
            { name: 'Requests', index: 5 },
            { name: 'Contracts', index: 6 },
            { name: 'Schedules', index: 7 },
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