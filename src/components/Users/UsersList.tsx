import React, { useState, useEffect } from 'react'
import Pusher from 'pusher-js';
import axios from "axios"
import { User } from '../../models/User'
import UserCard from './UserCard'
import "./UsersList.scss"
import UsersService from '../../services/UsersService'
import env from '../../environment/environment'

var pusher = new Pusher(env.PUSHER_APP_NAME, { cluster: env.PUSHER_APP_CLUSTER })

export default function UsersList() {
    const [users, setUsers] = useState<User[]>([])

    async function fetchUsers() {
        const data = await axios.get<{ data: User[] }>(`${env.API_URL}users/all`).then(resp => resp.data.data)
        UsersService.users.next(data);
    }

    useEffect(() => {
        fetchUsers()
        var channel = pusher.subscribe('users');
        channel.bind('update-users', () => fetchUsers());
        return () => pusher.disconnect()
    }, [])

    useEffect(() => {
        UsersService.users.subscribe(setUsers);
        return () => UsersService.users.unsubscribe()
    }, [])
    return (
        <div className="top-users">
            {
                users.length ? users.map(user => <UserCard key={user.id} {...user} />) :
                    (
                        <p>No users found</p>
                    )

            }
        </div>
    )
}
