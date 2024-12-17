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
 *            username:
 *              type: string
 *              description: User name.
 *            hashedPassword:
 *              type: string
 *              description: User password.
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types/index';

const userRouter = express.Router();

/**
 * @swagger
 * /Users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A successful response returns an array of users. Each item in the array is of type User.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await userService.getAllUsers());
});

/**
 * @swagger
 * /Users/{id}:
 *   get:
 *     summary: Get a User with a specific id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The User id.
 *     responses:
 *       200:
 *         description: A successful response returns a user of type User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await userService.getUserById(parseInt(req.params.id)));
});

userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body as UserInput;
        const JWT = await userService.registerUser(user);
        res.status(200).json(JWT);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
        next(err as Error);
    }
});

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = <{username: string, password: string}>req.body
            const JWT = await userService.authenticate(input);
            res.status(200).json(JWT);
        } catch (error) {
            next(error);
        }
    }
)


export { userRouter };
