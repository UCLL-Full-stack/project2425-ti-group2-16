/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
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
 *           createdAt:
 *              type: Date
 *              description: Group creation date.
 */
import express, { NextFunction, Request, Response } from 'express';
import groupService from '../service/group.service';
import { error } from 'console';
import userService from '../service/user.service';

const groupRouter = express.Router();

/**
 * @swagger
 * /Groups:
 *   get:
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
    try {
        return res.status(200).json(await groupService.getAllGroups());
    } catch (e) {
        next(error)
    }
});

/**
 * @swagger
 * /Groups/{id}:
 *   get:
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
        next(error)
    };
});

groupRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: {username: string} };
        const { username } = request.auth;
        const { name, description } = req.body;
        await groupService.createGroup({ name, description, username });
        const newJWT = await userService.getJWT(username);
        return res.status(200).json(newJWT);
    } catch (e) {
        next(error)
    }
});

groupRouter.post('/:id/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(await groupService.addUserToGroup(parseInt(req.params.id), parseInt(req.params.userId)));
    } catch (e) {
        next(error)
    }
});

groupRouter.delete('/:id/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(await groupService.removeUserFromGroup(parseInt(req.params.id), parseInt(req.params.userId)));
    } catch (e) {
        next(error)
    }
});


export { groupRouter };
