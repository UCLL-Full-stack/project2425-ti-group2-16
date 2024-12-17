import { Group } from '../model/group';
import groupDb from '../repository/group.db';

const getAllGroups = async (): Promise<Group[]> => {
    return await groupDb.getAllGroups();
};

const getGroupById = async (id: number): Promise<Group> => {
    const group = await groupDb.getGroupById({id});
    return group;
};

const removeUserFromGroup = async (groupId: number, userId: number): Promise<void> => {
    await groupDb.removeUserFromGroup({groupId, userId});
};

export default {
    getAllGroups,
    getGroupById,
    removeUserFromGroup,
};