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
 *            users:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/User"
 *            createdAt:
 *              type: string
 *              format: date
 *              description: Group creation date.
 *      GroupInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: group name
 *            description:
 *              type: string
 *              description: group description
 */
import express, { NextFunction, Request, Response } from 'express';
import groupService from '../service/group.service';
import { error } from 'console';
import userService from '../service/user.service';

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
 *         description: A successful response returns an array of groups. Each item in the array is of type Group.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 */
groupRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(await groupService.getAllGroups());
    } catch (e) {
        next(error);
    }
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
    try {
        return res.status(200).json(await groupService.getGroupById(parseInt(req.params.id)));
    } catch (e) {
        next(error);
    }
});

/**
 * @swagger
 * /groups:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Create a new group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/GroupInput"
 *     responses:
 *       200:
 *         description: The created group
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Group"
 */
groupRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string } };
        const { username } = request.auth;
        const { name, description } = req.body;
        await groupService.createGroup({ name, description, username });
        const newJWT = await userService.getJWT(username);
        return res.status(200).json(newJWT);
    } catch (e) {
        next(error);
    }
});

/**
 * @swagger
 * /groups/{id}/user/{userId}:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Create a new group
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *          required: true
 *          description: the group id
 *      - in: path
 *        name: userId
 *        schema:
 *          type: number
 *          required: true
 *          description: the user id
 *     responses:
 *       200:
 *         description: A succes response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Group"
 */
groupRouter.post('/:id/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res
            .status(200)
            .json(
                await groupService.addUserToGroup(
                    parseInt(req.params.id),
                    parseInt(req.params.userId)
                )
            );
    } catch (e) {
        next(error);
    }
});

/**
 * @swagger
 * /groups/{id}/user/{userId}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete a user from a group
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *          required: true
 *          description: the group id
 *      - in: path
 *        name: userId
 *        schema:
 *          type: number
 *          required: true
 *          description: the user id
 *     responses:
 *       200:
 *         description: A succes response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Group"
 */
groupRouter.delete('/:id/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res
            .status(200)
            .json(
                await groupService.removeUserFromGroup(
                    parseInt(req.params.id),
                    parseInt(req.params.userId)
                )
            );
    } catch (e) {
        next(error);
    }
});

export { groupRouter };
