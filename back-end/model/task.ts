import { User } from "./user";
import {
    Status as StatusPrisma,
    Task as TaskPrisma
} from '@prisma/client'

export class Task {
    private id?: number;
    private name: string;
    private description: string;

    constructor(user: {
        id?: number;
        name: string;
        description: string;
    }) {
        this.id = user.id;
        this.name = user.name;
        this.description = user.description;
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }
    
    // setters
    setname(name: string): void {
        this.name = name;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    // methods
    equals(otherTask: Task): boolean {
        return (
            this.name === otherTask.getName() &&
            this.description === otherTask.getDescription()
        );
    }

    static from({
        id,
        name,
        description
    }: TaskPrisma): Task {
        return new Task({
            id,
            name,
            description,
        });
    }
}
