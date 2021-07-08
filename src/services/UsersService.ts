import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User'

class UsersService {
    users = new BehaviorSubject<User[]>([])
    activeUser = new BehaviorSubject<User | null>(null)
    constructor() { }
}

export default new UsersService()