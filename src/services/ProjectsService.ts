import { BehaviorSubject, take } from 'rxjs';
import { Project } from '../models/Project'
import { User } from '../models/User';
import CommonService from './CommonService';
import UsersService from './UsersService';
class ProjectsService {
    projects = new BehaviorSubject<Project[]>([])
    activeProject = new BehaviorSubject<Project | null>(null)
    isFetching = new BehaviorSubject<boolean>(false)
    constructor() { }
    private getProjects() {
        let ps: Project[]
        this.projects.pipe(take(1)).subscribe(resp => { ps = resp })
        return ps
    }
    private findIdx(id: number) {
        let ps: Project[]
        this.projects.pipe(take(1)).subscribe(resp => { ps = resp })
        return ps.findIndex(p => p.id === id) || -1
    }
    public async fetchProjects(currentUser: User) {
        const data = await CommonService.get(`users/${currentUser.id}/projects`).then(resp => resp.data)
            .catch(console.log) || []
        this.projects.next([...data])
    }
    public async firtsFetchProjects(currentUser: User) {
        this.isFetching.next(true)
        const data = await CommonService.get(`users/${currentUser.id}/projects`).then(resp => resp.data)
            .catch(console.log) || []
        this.projects.next([...data])
        this.isFetching.next(false)
    }

    public async addNewFromPusher(project: Project) {
        const ps = this.getProjects()
        ps.push(project)
        this.projects.next(ps)
    }
    public async updateNewFromPusher(project: Project) {
        const projectIdx = this.findIdx(project.id)
        const ps = this.getProjects()
        ps[projectIdx] = project;
        this.projects.next(ps)
    }
    public async updateProject(project: Project) {

        this.updateNewFromPusher(project)

        const { id, name, description, image_url, user_id } = project
        const res = await CommonService.update(`projects/${id}/update`, { name, description, image_url, user_id }).then(resp => resp)
        if (res.message) {
            return true
        }
        return false
    }
    public async addProject(project: Project) {

        this.addNewFromPusher(project)

        const { name, description, image_url } = project
        let user_id = -1;
        UsersService.activeUser.pipe(take(1)).subscribe((user) => { user_id = user.id })
        const res = await CommonService.send(`projects/add`, { name, description, image_url, user_id })
        if (res.id) {
            project.id = res.id
            this.updateNewFromPusher(project)
            return true
        }
        return false
    }
    public async deleteProject(id: number) {
        const ps = this.getProjects()
        const projectIdx = this.findIdx(id)
        ps.splice(projectIdx, 1)
        this.projects.next(ps)
        const res = await CommonService.delete(`projects/${id}`)
        if (res.message) {
            return true
        }
        return false
    }
}

export default new ProjectsService()