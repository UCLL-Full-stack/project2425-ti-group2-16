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
        const { name, description, groupId } = req.body;
        return res.status(201).json(await boardService.createBoard(name, description, Number(groupId)));
    } catch (error) {
        next(error);
    }
});


export { boardRouter };