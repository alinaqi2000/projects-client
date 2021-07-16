export class User {
    constructor(
        public id: number,
        public role: "admin" | "user" = "user",
        public name: string,
        public email: string,
        public avatar: string,
        public password: string,
        public created_at: Date = new Date()
    ) { }
}