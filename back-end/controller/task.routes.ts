/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Task:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Task name.
 *            description:
 *              type: string
 *              description: Task description.
 */
import express, { NextFunction, Request, Response } from 'express';
import taskService from '../service/task.service';

const taskRouter = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: A successful response returns a task of type Task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
taskRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await taskService.getAllTasks());
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a Task with a specific id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The Task id.
 *     responses:
 *       200:
 *         description: A successful response returns a task of type Task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
taskRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await taskService.getTaskById(parseInt(req.params.id)));
});

taskRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json(await taskService.createTask(req.body));
});

export { taskRouter };
