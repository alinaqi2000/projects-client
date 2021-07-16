import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import env from '../environment/environment'
import { User } from '../models/User'
import UsersService from '../services/UsersService'
import { toastError } from '../utils/ToastUtils'
interface LoginForm {
    email: string
    password: string
}
export default function Login() {
    const [form, setForm] = useState<LoginForm>({ email: "", password: "" })
    const submitForm = async (e: any) => {
        e.preventDefault()
        const res = await axios.post<{ token?: string, error?: string }>(env.API_URL + "auth/login", form).then((res) => res.data)
        if (res.token) {
            localStorage.setItem(env.LOCAL_STORAGE_TOKEN_KEY_NAME, res.token)
            const resp = await axios.get<{ user: User }>(env.API_URL + "auth/verify_user", { headers: { "Authorization": `Bearer ${res.token}` } }).then((res) => res.data)
            UsersService.authUser.next(resp.user)
            if (resp.user.role == "user") {
                UsersService.activeUser.next(resp.user)
            }
        }
        if (res.error) {
            toastError(res.error)
        }
    }
    return (
        <div className="cont">
            <div className="row w-100 justify-content-center">
                <div className="col-lg-4">
                    <form id="user-form" onSubmit={submitForm} method="post">

                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" onChange={(e) => setForm({ ...form, email: e.target.value })} type="text" name="email" />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="avatar">Password</label>
                            <input className="form-control" onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" name="password" />
                        </div>
                        <button className="btn btn-secondary">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
