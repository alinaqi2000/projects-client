import React, { useState, useEffect } from 'react'
import { Project } from '../../models/Project'
import Pusher from 'pusher-js';
import ProjectCard from './ProjectCard'
import AddProject from './AddProject'

import "./ProjectsList.scss"
import ProjectsService from '../../services/ProjectsService'
import UsersService from '../../services/UsersService'
import env from '../../environment/environment';
import { User } from '../../models/User';
import ProjectCardSkeleton from '../Skeletons/ProjectCardSkeleton';

var pusher = new Pusher(env.PUSHER_APP_NAME, { cluster: env.PUSHER_APP_CLUSTER })

export default function ProjectsList({ user }: { user: User }) {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(() => {
        if (currentUser) {
            ProjectsService.firtsFetchProjects(currentUser)
            var channel = pusher.subscribe('projects_' + currentUser.id);
            channel.bind('update-projects', (data: { id: number }) => {
                if (data.id != user.id) {
                    ProjectsService.fetchProjects(currentUser)
                }
            });
        }
        // return () => pusher.disconnect()
    }, [currentUser])

    useEffect(() => {
        UsersService.activeUser.subscribe(setCurrentUser)
        ProjectsService.projects.subscribe((ps) => { setProjects([...ps]) })
        ProjectsService.isFetching.subscribe(setLoading)
        return () => {
            UsersService.activeUser.unsubscribe()
            ProjectsService.projects.unsubscribe()
            ProjectsService.isFetching.unsubscribe()
        }
    }, [])

    return (
        <div className="left-projects">
            {currentUser ? <h4 className="list-title">{currentUser.name}'s Projects</h4> : <h4 className="list-title">No user selected</h4>}
            <div className="projects-cards">

                {
                    isLoading ?
                        [1, 2, 3].map(v => <ProjectCardSkeleton key={v} />)
                        : projects.length ?
                            projects.map(project => <ProjectCard key={project.id} {...project} />) :
                            (<p>No projects found</p>)

                }

            </div>
            {currentUser ? <AddProject /> : ""}
        </div>
    )
}
