import { Task } from '../model/task';
import taskDb from '../repository/task.db';
import { TaskInput } from '../types';

const getAllTasks = async (): Promise<Task[]> => {
    return await taskDb.getAllTasks();
};

const getTaskById = async (id: number): Promise<Task> => {
    const task = await taskDb.getTaskById({id});
    return task;
};

const createTask = async (task: TaskInput & { statusId: number}): Promise<Task> => {
    return await taskDb.createTask(task);
}

export default {
    getAllTasks,
    getTaskById,
    createTask,
};