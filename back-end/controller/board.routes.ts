/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Board:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Board name.
 *            description:
 *              type: string
 *              description: Baord description.
 *            updatedAt:
 *              type: Date
 *              description: Board update date.
 *            statuses:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Task"
 *      BoardInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: board name
 *            description:
 *              type: string
 *              description: Description of the board
 *            statuses:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/TaskInput"
 */
import express, { NextFunction, Request, Response } from 'express';
import boardService from '../service/board.service';

const boardRouter = express.Router();

/**
 * @swagger
 * /boards:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all boards
 *     responses:
 *       200:
 *         description: Array with all boards. Each element of the array is of type board.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Board"
 */
boardRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(await boardService.getAllBoards());
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /boards:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all boards
 *     parameters:
 *      - in: query
 *        name: groupId
 *        schema:
 *          type: integer
 *          description: the group id
 *     responses:
 *       200:
 *         description: Boards with group id groupId.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Board"
 */
boardRouter.get('/group', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupId = Number(req.query.groupId);
        const request = req as Request & {
            auth: { leaderOfGroupsId: number[]; memberOfGroupsId: number[] };
        };
        const { leaderOfGroupsId, memberOfGroupsId } = request.auth;
        if (![...leaderOfGroupsId, ...memberOfGroupsId].includes(Number(groupId))) {
            return res.status(401).json({ message: 'You are not in this group' });
        }
        const boards = await boardService.getBoardsWithGroupId(groupId);
        return res.status(200).json(boards);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get board with a specific ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: the board id
 *     responses:
 *       200:
 *         description: Board with requested ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Board"
 */
boardRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(await boardService.getBoardById(parseInt(req.params.id)));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /boards:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Create a new board
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/BoardInput"
 *     responses:
 *       200:
 *         description: The created board
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Board"
 */
boardRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { leaderOfGroupsId: number[] } };
        const leaderOfGroupsId = request.auth.leaderOfGroupsId;
        const { name, description, groupId, statuses } = request.body;
        console.log(request.body);
        if (!leaderOfGroupsId.includes(Number(groupId))) {
            return res.status(401).json({ message: 'You are not the leader of this group' });
        return res
            .status(201)
            .json(await boardService.createBoard(name, description, Number(groupId), statuses));
    } catch (error) {
        next(error);
    }
});

export { boardRouter };
