export default class tableConfig {
    static managerTable() {
        return [
            { text: "PLAYER", value: "player", sortable: true },
            { text: "TEAM", value: "team", sortable: true },
            { text: "NUMBER", value: "number", sortable: true },
            { text: "POSITION", value: "position", sortable: true },
            { text: "HEIGHT", value: "indicator.height", sortable: true },
            { text: "WEIGHT (lbs)", value: "indicator.weight", sortable: true },
            { text: "LAST ATTENDED", value: "lastAttended", width: 300, sortable: true },
            { text: "COUNTRY", value: "country", sortable: true },
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

    static courseTable() {
        return [
            { text: "Name", value: "name", sortable: true },
            { text: "Description", value: "description", sortable: true },
            { text: "Total Slot", value: "totalSlot", sortable: true },
            { text: "Image", value: "image", sortable: true },
            { text: "Action", value: "operation" }
        ]
    }
}