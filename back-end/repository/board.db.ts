import { Board } from '../model/board';
import database from './database';

const everything = {
    statuses: {
        include: {
            tasks: true
        }
    }
};

const getAllBoards = async (): Promise<Board[]> => {
    try {
        const boardPrisma = await database.board.findMany({
            include: everything
        });
        return boardPrisma.map((boardPrisma) => Board.from(boardPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    };
};

const getBoardById = async ({ id }: { id: number }): Promise<Board> => {
    try {
        const boardPrisma = await database.board.findUnique({
            where: {
                id
            },
            include: everything
        });
        if (!boardPrisma) {
            throw new Error(`Board with id ${id} does not exist.`);
        }
        return Board.from(boardPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    };
};

const getBoardsWithGroupId = async (groupId: number): Promise<Board[]> => {
    try {
        const boardPrisma = await database.board.findMany({
            where: {
                groupId
            },
            include: everything
        });
        return boardPrisma.map((boardPrisma) => Board.from(boardPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    };
}

export default {
    getAllBoards,
    getBoardById,
    getBoardsWithGroupId,
};
