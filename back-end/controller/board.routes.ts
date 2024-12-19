import express, { NextFunction, Request, Response } from 'express';
import boardService from '../service/board.service';

const boardRouter = express.Router();

boardRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(await boardService.getAllBoards());
    } catch (error) {
        next(error);
    }
});

boardRouter.get('/group', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupId = Number(req.query.groupId);;
        const request = req as Request & { auth: {leaderOfGroupsId: number[], memberOfGroupsId: number[]} };
        const {leaderOfGroupsId, memberOfGroupsId} = request.auth;
        if (![...leaderOfGroupsId, ...memberOfGroupsId].includes(Number(groupId))) {
            return res.status(401).json({ message: 'You are not in this group' });
        };
        const boards = await boardService.getBoardsWithGroupId(groupId);
        return res.status(200).json(boards);
    } catch (error) {
        next(error);
    }
});

boardRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(await boardService.getBoardById(parseInt(req.params.id)));
    } catch (error) {
        next(error);
    }
});

boardRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: {leaderOfGroupsId: number[]} };
        const leaderOfGroupsId = request.auth.leaderOfGroupsId;
        const { name, description, groupId } = request.body;
        if (!leaderOfGroupsId.includes(Number(groupId))) {
            return res.status(401).json({ message: 'You are not the leader of this group' });
        };
        return res.status(201).json(await boardService.createBoard(name, description, Number(groupId)));
    } catch (error) {
        next(error);
    }
});


export { boardRouter };