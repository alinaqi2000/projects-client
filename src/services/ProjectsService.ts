import { BehaviorSubject, take } from 'rxjs';
import { Project } from '../models/Project'
import { User } from '../models/User';

class ProjectsService {
    projects = new BehaviorSubject<Project[]>([])
    activeProject = new BehaviorSubject<Project | null>(null)
    currentUser = new BehaviorSubject<User | null>(null)
    constructor() { }

    public deleteProject(id: number) {
        this.projects.pipe(take(1)).subscribe(ps => {
            const projectIdx = ps.findIndex(p => p.id == id)
            ps.splice(projectIdx, 1)
            console.log("projects next");
            this.projects.next(ps)

        })
    }
}

export default new ProjectsService()