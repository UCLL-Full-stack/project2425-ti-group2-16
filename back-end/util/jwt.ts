import jwt from 'jsonwebtoken';
import { Group } from '../model/group';

const generateJWTtoken = (username: string, memberOfGroups: Group[], leaderOfGroups: Group[]) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = `${process.env.JWT_EXPIRES_HOURS}h`;

    if (!secret) {
        throw new Error('JWT_SECRET is not defined.');
    };

    const memberOfGroupsId = memberOfGroups.map(group => group.getId());
    const leaderOfGroupsId = leaderOfGroups.map(group => group.getId());

    return jwt.sign({ username, memberOfGroupsId, leaderOfGroupsId }, secret, { expiresIn: expiresIn });
}

export { generateJWTtoken };