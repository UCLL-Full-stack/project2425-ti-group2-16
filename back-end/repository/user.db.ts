import { User } from '../model/user';
import database from './database';

const everything = {
    profile: true,
    memberOfGroups: {
        include: {
            boards: {
                include: {
                    statuses: {
                        include: {
                            tasks: true
                        }
                    }
                }
            },
            users: {
                include: {
                    profile: true
                }
            },
            leader: {
                include: {
                    profile: true
                }
            }
        }
    },
    leaderOfGroups: {
        include: {
            boards: {
                include: {
                    statuses: {
                        include: {
                            tasks: true
                        }
                    }
                }
            },
            users: {
                include: {
                    profile: true
                }
            },
            leader: {
                include: {
                    profile: true
                }
            }
        }
    }
};

const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany({
            include: everything
        });
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    };
};

const getUserById = async ({ id }: { id: number }): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id
            },
            include: everything
        });
        if (!userPrisma) {
            throw new Error(`User with id ${id} does not exist.`);
        }
        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    };
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                username
            },
            include: everything
        });
        if (!userPrisma) {
            throw new Error(`User with username ${username} does not exist.`);
        }
        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    };
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                username: user.getUsername(),
                hashedPassword: user.getHashedPassword(),
                profile: user.getProfile() ? {
                    create: {
                        email: user.getProfile()?.getEmail() || '',
                        firstName: user.getProfile()?.getFirstName() || '',
                        lastName: user.getProfile()?.getLastName() || '',
                        bio: user.getProfile()?.getBio() || ''
                    }
                } : undefined
            },
            include: everything
        });
        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    };
};

export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
};
