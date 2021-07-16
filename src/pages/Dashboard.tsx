import React, { useEffect, useState } from 'react'
import ProjectsList from '../components/Projects/ProjectsList';
import UsersList from '../components/Users/UsersList';
import AuthGuard from '../guards/AuthGuard';
import { User } from '../models/User';

export default function Dashboard({ user }: { user: User }) {
    return (
        <AuthGuard>
            <div className="cont">
                <div className="row w-100">
                    {user && user.role == "admin" ? <UsersList /> : ""}
                    <div className="col-md-6">
                        <ProjectsList user={user} />
                    </div>
                    <div className="col-md-6">
                        {/* <ProjectsList /> */}
                    </div>
                </div>
            </div>
        </AuthGuard>
    )
}
