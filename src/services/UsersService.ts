import { BehaviorSubject } from 'rxjs';
import env from '../environment/environment';
import { User } from '../models/User'
import CommonService from './CommonService';

class UsersService {
    users = new BehaviorSubject<User[]>([])
    activeUser = new BehaviorSubject<User | null>(null)
    authUser = new BehaviorSubject<User | null>(null)
    verifying = new BehaviorSubject<boolean>(false)
    constructor() { }

    public async verify() {
        this.verifying.next(true)
        const token: string = localStorage.getItem(env.LOCAL_STORAGE_TOKEN_KEY_NAME) || ""
        if (token) {
            const resp = await CommonService.get("auth/verify_user",).then((res) => res)
            this.authUser.next(resp.user)
            if (resp.user.role == "user") {
                this.activeUser.next(resp.user)
            }
        }
        this.verifying.next(false)
    }
}

export default new UsersService()