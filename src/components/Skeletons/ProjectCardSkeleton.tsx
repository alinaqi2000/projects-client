import { Skeleton } from '@chakra-ui/skeleton'
import React from 'react'

export default function ProjectCardSkeleton() {
    return (
        <div className={`project-card`} >
            <Skeleton className="image">
                <span>N</span>
            </Skeleton>
            <div className="name">
                <Skeleton style={{ margin: '0 12px' }}><span>This is a project title</span> </Skeleton>
                <div className="actions" style={{ opacity: 1 }}>
                    <button className="btn"> <Skeleton><span>III</span></Skeleton></button>
                    <button className="btn"> <Skeleton><span>III</span></Skeleton></button>
                </div>
            </div>
        </ div>
    )
}
