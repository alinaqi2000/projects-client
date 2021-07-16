import { navigate } from '@reach/router';
import React, { useEffect } from 'react'
import { useObservable } from '../hooks/useObservale';
import { User } from '../models/User';
import UsersService from '../services/UsersService';

export default function AuthGuard(props: { children: JSX.Element | JSX.Element[] }) {
    const activeUser: User = useObservable(UsersService.activeUser)
    useEffect(() => {
        console.log(activeUser);
        if (!activeUser) {
            // navigate('/login')
        }
    }, [])
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}
