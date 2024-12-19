/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Group:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Group name.
 *            description:
 *              type: string
 *              description: Group description.
 *            createdAt:
 *              type: Date
 *              description: Group creation date.
 */
import express, { NextFunction, Request, Response } from 'express';
import groupService from '../service/group.service';

const groupRouter = express.Router();

/**
 * @swagger
 * /groups:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a list of all groups.
 *     responses:
 *       200:
 *         description: A successful response returns an array of groups. Each item in the array is of type User.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 */
groupRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await groupService.getAllGroups());
});

/**
 * @swagger
 * /groups/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a group with a specific id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The group id.
 *     responses:
 *       200:
 *         description: A successful response returns a group of type Group.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 */
groupRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await groupService.getGroupById(parseInt(req.params.id)));
});

export { groupRouter };
