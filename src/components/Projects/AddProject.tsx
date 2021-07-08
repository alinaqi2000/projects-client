import React, { useState, useEffect, useMemo } from 'react'
import { Project } from '../../models/Project'
import "./AddProject.scss"
import { checkImage } from '../../utils/ImageUtils'
import { Edit2, Plus, Save, XCircle, ChevronUp, ChevronDown } from 'react-feather';
import UsersService from '../../services/UsersService';
import { take } from 'rxjs';
import axios from 'axios';
import env from '../../environment/environment';
import { toastSuccess, toastError } from '../../utils/ToastUtils';

export default function AddProject() {
    const [project, setProject] = useState<Project | null>(new Project(-1, -1, "New Project", "", "", new Date()))
    const [addNew, setAddNew] = useState(false);
    const [image, setImage] = useState(<span>N</span>);
    const [showImage, setShowImage] = useState(false);
    const [showDesc, setShowDesc] = useState(false);

    const loadProjectImage = async () => {
        if (project.image_url) {
            const imageExists = await checkImage(project.image_url);
            if (imageExists)
                return setImage(<div className="img" style={{ background: `url('${project.image_url}')` }}></div>)
        }
        return setImage(<span>{project.name.charAt(0).toUpperCase()}</span>)
    }

    useEffect(() => {
        loadProjectImage()
    }, [project])
    const saveProject = async () => {
        const { name, description, image_url } = project
        let user_id = -1;
        UsersService.activeUser.pipe(take(1)).subscribe((user) => { user_id = user.id })
        const res = await axios.post<{ message: string }>(env.API_URL + `projects/add`, { name, description, image_url, user_id }).then(resp => resp.data)
        if (res.message) {
            toastSuccess(res.message)
            setProject(new Project(-1, -1, "New Project", "", "", new Date()))
            setImage(<span>N</span>)
            setShowImage(false)
            setShowDesc(false)
            setAddNew(false)
        } else {
            toastError("Unknown exception!")
        }
    }
    return (
        <React.Fragment>
            {
                !addNew ? (
                    <div className="add-new">
                        <button className="btn" onClick={() => setAddNew(true)}>Add New <Plus /></button>
                    </div>
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
                                    <button className="btn btn-sm cancel" onClick={() => setAddNew(false)}>Cancel <XCircle /></button>
                                    <button className="btn btn-sm" onClick={saveProject}>Save <Save /></button>
                                </div>
                            </div>
                        </div>
                    </ div>
                )
            }
        </React.Fragment>
    )


}
