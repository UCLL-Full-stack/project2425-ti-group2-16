import { Board } from '../model/board';
import boardDb from '../repository/board.db';

const getAllBoards = async (): Promise<Board[]> => {
    return await boardDb.getAllBoards();
};

const getBoardById = async (id: number): Promise<Board> => {
    const board = await boardDb.getBoardById({id});
    return board;
}

const getBoardsWithGroupId = async (groupId: number): Promise<Board[]> => {
    return await boardDb.getBoardsWithGroupId(groupId);
}

export default {
    getAllBoards,
    getBoardById,
    getBoardsWithGroupId,
};