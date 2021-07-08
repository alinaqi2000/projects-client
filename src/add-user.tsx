import "./styles/add-user.scss"
import axios from "../node_modules/axios/index"

import * as $ from 'jquery'

interface UserForm {
    name: string
    email: string
    avatar: string
    password: string
}
function getFormValues(form: JQuery<any>): UserForm {
    var paramObj: any = {};
    $.each(form.serializeArray(), function (_, kv) {
        if (paramObj.hasOwnProperty(kv.name)) {
            paramObj[kv.name] = $.makeArray(paramObj[kv.name]);
            paramObj[kv.name].push(kv.value);
        }
        else {
            paramObj[kv.name] = kv.value;
        }
    });
    return paramObj
}

$(document).on("submit", "#user-form", async function (e: any) {
    e.preventDefault()
    const form_value = getFormValues($(this))

    const isSent = await sendUser(form_value)

    isSent && e.target.reset()
})
async function sendUser(user: UserForm) {
    const res = await axios.post<{ message?: string, error?: string }>("http://localhost:5000/users/add", user).then(resp => resp.data)
    if (res.error) {
        console.log(res.error)
    }
    if (res.message) {
        console.log(res.message)
        return true
    }
    return false
}