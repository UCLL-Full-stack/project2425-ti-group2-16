import { Status } from '../model/status';
import database from './database';

const everything = {
    tasks: true
}



const getAllStatuses = async (): Promise<Status[]> => {
    try {
        const statusPrisma = await database.status.findMany({
            include: everything
        });
        return statusPrisma.map((statusPrisma) => Status.from(statusPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    }
};

const getStatusById = async ({ id }: { id: number }): Promise<Status> => {
    try {
        const statusPrisma = await database.status.findUnique({
            where: {
                id
            },
            include: everything
        });
        if (!statusPrisma) {
            throw new Error(`status with id ${id} does not exist.`);
        }
        return Status.from(statusPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    }
};

const createStatus = async ({ name, boardId }: { name: string, boardId: number }): Promise<Status> => {
    try {
        const statusPrisma = await database.status.create({
            data: {
                name,
                board: {
                    connect: {
                        id: boardId,
                    },
                },
                tasks: {},
            },
            include: everything
        });
        return Status.from(statusPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    }
}

export default {
    getAllStatuses,
    getStatusById,
    createStatus,
};
