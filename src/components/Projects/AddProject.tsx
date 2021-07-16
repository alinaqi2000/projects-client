import React, { useState, useEffect, useMemo } from 'react'
import { Project } from '../../models/Project'
import "./AddProject.scss"
import { Edit2, Plus, Save, XCircle, ChevronUp, ChevronDown } from 'react-feather';
import UsersService from '../../services/UsersService';
import { take } from 'rxjs';
import axios from 'axios';
import env from '../../environment/environment';
import LoadImage from '../Layout/LoadImage';
import UIService from '../../services/UIService';
import ProjectsService from '../../services/ProjectsService';

export default function AddProject() {
    const [project, setProject] = useState<Project | null>(new Project(-1, -1, "New Project", "", "", new Date()))
    const [addNew, setAddNew] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [showDesc, setShowDesc] = useState(false);



    const saveProject = async () => {
        setProject(new Project(-1, -1, "New Project", "", "", new Date()))
        setShowImage(false)
        setShowDesc(false)
        setAddNew(false)
        const res = await ProjectsService.addProject(project)
        if (!res) {
            setProject(project)
            setShowImage(true)
            setShowDesc(true)
            setAddNew(true)
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
