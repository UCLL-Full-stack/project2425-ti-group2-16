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
    return res.status(200).json(await boardService.getAllBoards());
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
    return res.status(200).json(await boardService.getBoardById(parseInt(req.params.id)));
});

export { boardRouter };
