import dayjs from "dayjs"

export default class func {
    static convertDate(date) {
        if (date == null) return ''
        return dayjs(date).format("DD/MM/YYYY");
    }




    static convertDateOldVer(date) {
        let fDate = new Date(date)
        return fDate.toLocaleString()
    }

    static convertVND(price) {
        if (price != null && price != undefined && price != '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        else return 0
    }

    static isBlobURL(url) {
        return url.startsWith("blob:");
    }

    static removeElementByValue(array, element) {
        let index = array.indexOf(element)
        if (index > -1) {
            array.splice(index, 1)
        }
    }

    static cloneArray(data) {
        return [...data]
    }

    static cloneObject(data) {
        return { ...data }
    }

    static makeUnique(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    // Hàm thiết lập Cookie
    static setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    // Hàm lấy Cookie
    static getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    static deleteCookie(cookieName) {
        // Đặt thời gian hết hạn của cookie về quá khứ
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    static getClientURL() {
        const BASE_URL = import.meta.env.VITE_CLIENT_URL
        return BASE_URL
    }

}