import { Task } from '../model/task';
import { TaskInput } from '../types';
import database from './database';

const getAllTasks = async (): Promise<Task[]> => {
    try {
        const taskPrisma = await database.task.findMany();
        return taskPrisma.map((taskPrisma) => Task.from(taskPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    }
};

const getTaskById = async ({ id }: { id: number }): Promise<Task> => {
    try {
        const taskPrisma = await database.task.findUnique({
            where: {
                id
            }
        });
        if (!taskPrisma) {
            throw new Error(`Task with id ${id} does not exist.`);
        }
        return Task.from(taskPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    }
};

const createTask = async (task: TaskInput & { statusId: number}): Promise<Task> => {
    try {
        const taskPrisma = await database.task.create({
            data: {
                name: task.name || 'New Task',
                description: task.description || '',
                status: {
                    connect: {
                        id: task.statusId
                    }
                }
            }
        });
        return Task.from(taskPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    }
}

export default {
    getAllTasks,
    getTaskById,
    createTask,
};
