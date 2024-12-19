import { Group } from '../model/group';
import groupDb from '../repository/group.db';
import userDb from '../repository/user.db';

const getAllGroups = async (): Promise<Group[]> => {
    return await groupDb.getAllGroups();
};

const getGroupById = async (id: number): Promise<Group> => {
    const group = await groupDb.getGroupById({id});
    return group;
};

const createGroup = async ({name, description, username}: any): Promise<Group> => {
    const user = await userDb.getUserByUsername({username});
    const leaderId = user.getId();
    if (!leaderId) {
        throw new Error('User has no id.');
    };
    const group = await groupDb.createGroup({name, description, leaderId});
    return group;
};

const removeUserFromGroup = async (groupId: number, userId: number): Promise<void> => {
    await groupDb.removeUserFromGroup({groupId, userId});
};

const addUserToGroup = async (groupId: number, userId: number): Promise<void> => {
    await groupDb.addUserToGroup({groupId, userId});
};

export default {
    getAllGroups,
    getGroupById,
    createGroup,
    removeUserFromGroup,
    addUserToGroup,
};