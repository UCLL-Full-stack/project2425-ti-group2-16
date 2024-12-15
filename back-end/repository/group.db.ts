import { Group } from '../model/group';
import database from './database';

const everything = {
    boards: {
        include: {
            statuses: {
                include: {
                    tasks: true
                }
            }
        }
    },
    users: {
        include: {
            profile: true
        }
    },
    leader: {
        include: {
            profile: true
        }
    }
};

const getAllGroups = async (): Promise<Group[]> => {
    try {
        const groupPrisma = await database.group.findMany({
            include: everything
        });
        return groupPrisma.map((groupPrisma) => Group.from(groupPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    };
};

const getGroupById = async ({ id }: { id: number }): Promise<Group> => {
    try {
        const groupPrisma = await database.group.findUnique({
            where: {
                id
            },
            include: everything
        });
        if (!groupPrisma) {
            throw new Error(`group with id ${id} does not exist.`);
        }
        return Group.from(groupPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    };
};

export default {
    getAllGroups,
    getGroupById,
};
