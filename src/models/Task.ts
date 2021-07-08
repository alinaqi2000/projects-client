export class Task {
    constructor(
        public id: number,
        public name: string,
        public status: "pending" | "in progress" | "completed" = "pending",
        public description: string,
        public due_date: Date = new Date(),
        public complete_at: Date = new Date(),
        public updated_at: Date = new Date()
    ) { }
}