/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Status:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Status name.
 *            tasks:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Task"
 */
import express, { NextFunction, Request, Response } from 'express';
import statusService from '../service/status.service';

const statusRouter = express.Router();

/**
 * @swagger
 * /statuses:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all statuses.
 *     responses:
 *       200:
 *         description: A successful response returns a status of type Status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
 */
statusRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await statusService.getAllStatuses());
});

/**
 * @swagger
 * /statuses/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a Status with a specific id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The Status id.
 *     responses:
 *       200:
 *         description: A successful response returns a status of type Status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
statusRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await statusService.getStatusById(parseInt(req.params.id)));
});

export { statusRouter };
