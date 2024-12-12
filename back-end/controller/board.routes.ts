import express, { NextFunction, Request, Response } from 'express';
import boardService from '../service/board.service';

const boardRouter = express.Router();

boardRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await boardService.getAllBoards());
});

boardRouter.get('/group', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupId = Number(req.query.groupId);;
        const boards = await boardService.getBoardsWithGroupId(groupId);
        return res.status(200).json(boards);
    } catch (error) {
        next(error);
    }
});

boardRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await boardService.getBoardById(parseInt(req.params.id)));
});


export { boardRouter };