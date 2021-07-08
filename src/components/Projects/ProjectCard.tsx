import React, { useState, useEffect, useMemo } from 'react'
import { Project } from '../../models/Project'
import "./ProjectCard.scss"
import ProjectsService from '../../services/ProjectsService'
import { checkImage } from '../../utils/ImageUtils'
import { Edit, Edit2, Save, XCircle, ChevronUp, ChevronDown, Trash } from 'react-feather';
import env from '../../environment/environment'
import axios from 'axios'
import { toastError, toastSuccess } from '../../utils/ToastUtils'


export default function ProjectCard(p: Project) {
    const [project, setProject] = useState<Project>(p)
    const [tempProject, setTempProject] = useState<Project>(p)
    const [activeProject, setActiveProject] = useState<Project | null>(null)
    const [image, setImage] = useState(<span>{project.name.charAt(0).toUpperCase()}</span>);

    const [editMode, setEditMode] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [showDesc, setShowDesc] = useState(false);

    const loadProjectImage = async () => {
        if (project.image_url) {
            const imageExists = await checkImage(project.image_url);
            if (imageExists)
                return (<div className="img" style={{ background: `url('${project.image_url}')` }}></div>)
        }
        return (<span>{project.name.charAt(0).toUpperCase()}</span>)
    }

    useEffect(() => {
        let isCancelled = false
        loadProjectImage().then((pImage) => {
            if (!isCancelled) { setImage(pImage) }
        });
        return () => { isCancelled = true }

    }, [project.name, project.image_url])

    useEffect(() => {
        let isCancelled = false
        ProjectsService.activeProject.subscribe(resp => {
            if (!isCancelled) { setActiveProject(resp) }
        });
        return () => { isCancelled = true }
    }, [])

    const saveProject = async () => {
        const { id, name, description, image_url, user_id } = project
        const res = await axios.put<{ message: string }>(env.API_URL + `projects/${id}/update`, { name, description, image_url, user_id }).then(resp => resp.data)
        if (res.message) {
            toastSuccess(res.message)
            setTempProject(project)
            setShowImage(false)
            setShowDesc(false)
            setEditMode(false)
        } else {
            toastError("Unknown exception!")
        }
    }
    const deleteProject = async () => {
        const { id } = project
        if (confirm("Are you sure you want to delete this project?")) {
            ProjectsService.deleteProject(id)
            const res = await axios.delete<{ message: string }>(env.API_URL + `projects/${id}`).then(resp => resp.data)
            if (res.message) {
                toastSuccess(res.message)
            } else {
                toastError("Unknown exception!")
            }

        }
    }
    return (
        <React.Fragment>
            {
                !editMode ? (
                    <div onClick={() => ProjectsService.activeProject.next(project)} className={`project-card ` + (activeProject && activeProject.id == project.id ? "active" : '')} >
                        <div className="image">
                            {image}
                            <div onClick={() => {
                                setEditMode(true)
                                setShowImage(!showImage)
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
                            {image}
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
