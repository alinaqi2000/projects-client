import React, { useState, useEffect, useMemo } from 'react'
import { Project } from '../../models/Project'
import "./ProjectCard.scss"
import ProjectsService from '../../services/ProjectsService'
import { Edit, Edit2, Save, XCircle, ChevronUp, ChevronDown, Trash } from 'react-feather';

import LoadImage from '../Layout/LoadImage';


export default function ProjectCard(p: Project) {
    const [project, setProject] = useState<Project>(p)
    const [tempProject, setTempProject] = useState<Project>(p)
    const [activeProject, setActiveProject] = useState<Project | null>(null)

    const [editMode, setEditMode] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [showDesc, setShowDesc] = useState(false);

    const saveProject = async () => {
        setShowImage(false)
        setShowDesc(false)
        setEditMode(false)
        setTempProject(project)
        const res = await ProjectsService.updateProject(project)
        if (!res) {
            setShowImage(true)
            setShowDesc(true)
            setEditMode(true)
        }
    }
    const deleteProject = async () => {
        const { id } = project
        if (confirm("Are you sure you want to delete this project?")) {
            ProjectsService.deleteProject(id)
        }
    }
    return (
        <React.Fragment>
            {
                !editMode ? (
                    <div onClick={() => ProjectsService.activeProject.next(project)} className={`project-card ` + (activeProject && activeProject.id == project.id ? "active" : '')} >
                        <div className="image">
                            <LoadImage {...project} />
                            <div onClick={() => {
                                setEditMode(true)
                                setShowImage(true)
                            }} className="upload-overlay">
                                <Edit2 />
                            </div>
                        </div>
                        <div className="name">
                            <h4>{project.name}</h4>
                            <div className="actions">
                                <button onClick={() => setEditMode(true)} className="btn"><Edit /></button>
                                <button className="btn" onClick={deleteProject}><Trash /></button>
                            </div>
                        </div>
                    </ div>
                ) : (
                    <div className={`add-project-card`} >
                        <div className="image">
                            <LoadImage {...project} />
                            <div onClick={() => setShowImage(!showImage)} className="upload-overlay">
                                <Edit2 />
                            </div>
                        </div>
                        <div className="body">
                            <div className="name">
                                <input onChange={(e: any) => setProject({ ...project, name: e.target.value })} value={project.name} />

                                {
                                    showImage ? <input placeholder="Image URL" onChange={(e: any) => setProject({ ...project, image_url: e.target.value })} value={project.image_url} /> : ""
                                }

                                <div className={`desc-box ${showDesc ? "show" : ""}`}>
                                    <textarea onChange={(e: any) => setProject({ ...project, description: e.target.value })} value={project.description}></textarea>
                                </div>
                            </div>
                            <div className="actions">
                                <button className="btn btn-sm show-desc" onClick={() => setShowDesc(!showDesc)}>{!showDesc ? "Show" : "Hide"} Description {!showDesc ? <ChevronDown /> : <ChevronUp />}</button>
                                <div className="btns">
                                    <button className="btn btn-sm cancel" onClick={() => {
                                        setEditMode(false)
                                        setProject(tempProject)
                                    }}>Cancel <XCircle /></button>
                                    <button className="btn btn-sm" onClick={saveProject}>Update <Save /></button>
                                </div>
                            </div>
                        </div>
                    </ div>
                )
            }
        </React.Fragment>

    )
}
