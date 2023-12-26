export default class menu {
    static sidebarMenu() {
        return [
            {
                id: 1, name: 'Users', icon: 'hi-user-group', subTab: [
                    { name: 'Create User', url: 'user-create' },
                    { name: 'Managers', url: 'managers' },
                    { name: 'Staffs', url: 'staffs' },
                    { name: 'Teachers', url: 'teachers' },
                ], isShow: false, isActive: false
            },
            {
                id: 2, name: 'Contracts', icon: 'fa-file-contract', subTab: [
                    { name: 'Contract', url: 'contract' },
                ], isShow: false, isActive: false
            },
            { id: 3, name: 'Salary', icon: 'la-money-check-alt-solid', subTab: [], isShow: false, isActive: false },
            {
                id: 4, name: 'Calendar', icon: 'bi-calendar-week', subTab: [
                    { name: 'My Calendar', url: 'my-calendar' },
                    { name: 'User Calendar', url: 'user-calendar' },
                ], isShow: false, isActive: false
            },
            { id: 5, name: 'Classrooms', icon: 'co-room', subTab: [], isShow: false, isActive: false },
            {
                id: 6, name: 'Attendance', icon: 'md-taskalt', subTab: [
                    { name: 'Today Attendance', url: 'today-attendance' },
                    { name: 'User Attendance', url: 'user-attendance' },
                ], isShow: false, isActive: false
            },
            {
                id: 7, name: 'Courses', icon: 'si-coursera', subTab: [
                    { name: 'Create Course', url: 'course-create' },
                    { name: 'Courses', url: 'courses' },
                ], isShow: false, isActive: false
            },
        ]
    }


    static userProfileMenu() {
        return [
            { name: 'General information', index: 1 },
            { name: 'Security', index: 2 },
            { name: 'Courses', index: 3 },
            { name: 'Academic transcript', index: 4 },
            { name: 'Evaluation board', index: 5 },
        ]
    }
}