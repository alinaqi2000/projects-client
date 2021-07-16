import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import env from '../environment/environment';
import { toastError, toastSuccess } from '../utils/ToastUtils';

class CommonService {

    public async send(url: string, formData: Object) {
        const token: string = localStorage.getItem(env.LOCAL_STORAGE_TOKEN_KEY_NAME) || ""

        const res = await axios.post(env.API_URL + url, formData, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => res.data)
        if (res.message) {
            toastSuccess(res.message)
        }
        if (res.error) {
            toastError(res.error)
        }
        return res
    }
    public async update(url: string, formData: Object) {
        const token: string = localStorage.getItem(env.LOCAL_STORAGE_TOKEN_KEY_NAME) || ""

        const res = await axios.put(env.API_URL + url, formData, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => res.data)
        if (res.message) {
            toastSuccess(res.message)
        }
        if (res.error) {
            toastError(res.error)
        }
        return res
    }
    public async delete(url: string) {
        const token: string = localStorage.getItem(env.LOCAL_STORAGE_TOKEN_KEY_NAME) || ""

        const res = await axios.delete(env.API_URL + url, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => res.data)
        if (res.message) {
            toastSuccess(res.message)
        }
        if (res.error) {
            toastError(res.error)
        }
        return res
    }
    public async get(url: string) {
        const token: string = localStorage.getItem(env.LOCAL_STORAGE_TOKEN_KEY_NAME) || ""
        const res = await axios.get(env.API_URL + url, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => res.data)
        return res
    }
}
export default new CommonService()