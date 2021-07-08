export class Project {
    constructor(
        public id: number,
        public user_id: number,
        public name: string,
        public description: string,
        public image_url: string,
        public date: Date = new Date()
    ) { }
}