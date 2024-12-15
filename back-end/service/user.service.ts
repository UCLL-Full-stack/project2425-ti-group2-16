import { Profile } from '../model/profile';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import { generateJWTtoken } from '../util/jwt';
import bcrypt from 'bcrypt';


const getAllUsers = async (): Promise<User[]> => {
    return await userDb.getAllUsers();
};

const getUserById = async (id: number): Promise<User> => {
    const user = userDb.getUserById({id});
    return user;
}

const registerUser = async ({
    id,
    username,
    password,
    profile: {
        id: profileId,
        email,
        firstName,
        lastName,
        bio
    } = {}
}: UserInput): Promise<AuthenticationResponse> => {
    if (!username || !password) {
        throw new Error('Username and password are required.');
    }

    try {
        await userDb.getUserByUsername({username});
    } catch (error) {
        const userProfile = profileId || firstName || lastName || bio ? new Profile({
            id: profileId,
            email: email || "",
            firstName: firstName || "",
            lastName: lastName || "",
            bio: bio || ""
        }) : undefined;
    
        const newUser = new User({
            id,
            username,
            hashedPassword: await bcrypt.hash(password, 10),
            profile: userProfile,
            memberOfGroups: [],
            leaderOfGroups: []
        });
    
        userDb.createUser(newUser);
    
        const JWT = generateJWTtoken(username, [], []);
        const response = {
            token: JWT,
            username: username,
            fullname: `${firstName} ${lastName}`
        };
        return response;
    };
    throw new Error(`User with username ${username} already exists.`);
};

const authenticate = async ({ username, password}: { username: string, password: string }): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByUsername({username});
    const hashedPassword = user.getHashedPassword();
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
        const JWT = generateJWTtoken(username, user.getMemberOfGroups(), user.getLeaderOfGroups());
        const response = {
            token: JWT,
            username: username,
            fullname: `${user.getProfile()?.getFirstName()} ${user.getProfile()?.getLastName()}`
        };
        return response;
    } else {
        throw new Error(`Incorrect username or password`);
    };
};

export default {
    getAllUsers,
    getUserById,
    registerUser,
    authenticate,
};
