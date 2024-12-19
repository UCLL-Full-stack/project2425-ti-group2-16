import { Board } from '../model/board';
import boardDb from '../repository/board.db';
import statusDb from '../repository/status.db';
import { StatusInput } from '../types';

const getAllBoards = async (): Promise<Board[]> => {
    return await boardDb.getAllBoards();
};

const getBoardById = async (id: number): Promise<Board> => {
    const board = await boardDb.getBoardById({id});
    return board;
};

const getBoardsWithGroupId = async (groupId: number): Promise<Board[]> => {
    return await boardDb.getBoardsWithGroupId(groupId);
};

const createBoard = async (name: string, description: string, groupId: number, statuses: StatusInput[]): Promise<Board> => {
    const board = await boardDb.createBoard({name, description, groupId});
    const boardId = board.getId();
    if (!boardId) {
        throw new Error('Something went wrong creating the board.');
    }

    statuses.forEach(async (status) => {
        if (!status.name) {
            throw new Error('Board name is required.');
        };
        await statusDb.createStatus({name: status.name, boardId: boardId});
    });
    return await boardDb.getBoardById({id: boardId});
};

export default {
    getAllBoards,
    getBoardById,
    getBoardsWithGroupId,
    createBoard,
};