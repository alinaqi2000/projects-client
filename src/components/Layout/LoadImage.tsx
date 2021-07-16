import React, { useEffect, useState } from "react";
import { Project } from "../../models/Project";


export default function LoadImage(project: Project) {
    const [image, setImage] = useState(<span>{project.name.charAt(0).toUpperCase()} </span>)
    const checkImage = (path: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = path;
        });
    }
    const loadImage = async () => {
        if (project.image_url) {
            const imageExists = await checkImage(project.image_url);
            if (imageExists)
                return (<div className="img" style={{ background: `url('${project.image_url}')` }
                }> </div>)
        }
        return <span>{project.name ? project.name.charAt(0).toUpperCase() : '?'} </span>
    }
    useEffect(() => {
        let isCancelled = false
        loadImage().then((pImage) => {
            if (!isCancelled) { setImage(pImage) }
        });
        return () => { isCancelled = true }
    }, [project.name, project.image_url])
    return image
}
