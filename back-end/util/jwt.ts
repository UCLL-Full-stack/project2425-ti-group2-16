import jwt from 'jsonwebtoken';
import { Group } from '../model/group';

const generateJWTtoken = (username: string, memberOfGroups: Group[], leaderOfGroups: Group[]) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = `${process.env.JWT_EXPIRES_HOURS}h`;

    if (!secret) {
        throw new Error('JWT_SECRET is not defined.');
    };

    return jwt.sign({ username, memberOfGroups, leaderOfGroups }, secret, { expiresIn: expiresIn });
}

export { generateJWTtoken };