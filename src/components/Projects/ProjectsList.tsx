import React, { useState, useEffect } from 'react'
import { Project } from '../../models/Project'
import Pusher from 'pusher-js';
import ProjectCard from './ProjectCard'
import AddProject from './AddProject'

import "./ProjectsList.scss"
import ProjectsService from '../../services/ProjectsService'
import UsersService from '../../services/UsersService'
import env from '../../environment/environment';
import axios from 'axios';
import { User } from '../../models/User';

var pusher = new Pusher(env.PUSHER_APP_NAME, { cluster: env.PUSHER_APP_CLUSTER })

export default function ProjectsList() {
    const [projects, setProjects] = useState<Project[]>([])
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    async function fetchProjects() {
        if (currentUser) {
            const data = await axios.get<{ data: Project[] }>(env.API_URL + `users/${currentUser.id}/projects`).then(resp => resp.data.data)
            ProjectsService.projects.next(data);
        }
    }

    useEffect(() => {
        if (currentUser) {
            fetchProjects()
            var channel = pusher.subscribe('projects_' + currentUser.id);
            channel.bind('update-projects', () => fetchProjects());
        }
        // return () => pusher.disconnect()
    }, [currentUser])

    useEffect(() => {
        UsersService.activeUser.subscribe(setCurrentUser)
        ProjectsService.projects.subscribe((ps) => {
            setProjects([...ps])
        })
        return () => {
            UsersService.activeUser.unsubscribe()
            ProjectsService.projects.unsubscribe()
        }
    }, [])

    return (
        <div className="left-projects">
            {currentUser ? <h4>{currentUser.name}'s Projects</h4> : <h4>No user selected</h4>}
            <div className="projects-cards">

                {
                    projects.length ?
                        projects.map(project => <ProjectCard key={project.id} {...project} />) :
                        (<p>No projects found</p>)

                }
            </div>
            {currentUser ? <AddProject /> : ""}

        </div >
    )
}
