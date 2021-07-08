import React, { useState, useEffect } from 'react'
import { User } from '../../models/User'
import "./UserCard.scss"
import UsersService from '../../services/UsersService'

export default function UserCard(user: User) {
    const [activeUser, setActiveUser] = useState<User | null>(null)
    useEffect(() => {
        UsersService.activeUser.subscribe(setActiveUser);
        return () => UsersService.activeUser.unsubscribe()
    }, [])
    return (
        <div onClick={() => UsersService.activeUser.next(user)} className={`user-card ` + (activeUser && activeUser.id == user.id ? "active" : '')} >
            <div
                className="avatar"
                style={{
                    background: `url('${user.avatar}')`
                }}
            ></div>
            <div className="name"><h4>{user.name}</h4><p>@{user.email}</p></div>
        </ div>
    )
}
