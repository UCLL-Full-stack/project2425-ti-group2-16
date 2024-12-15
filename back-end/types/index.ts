type UserInput = {
    id?: number;
    username?: string;
    hashedPassword?: string;
    password?: string;
    profile?: ProfileInput;
    memberOfGroups?: GroupInput[];
    leaderOfGroups?: GroupInput[];
    tasks?: TaskInput[];
};

type GroupInput = {
    id?: number;
    name?: string;
    description?: string;
    createdAt?: Date;
    users?: UserInput[];
    leader?: UserInput;
    boards?: BoardInput[];
};

type BoardInput = {
    id?: number;
    name?: string;
    description?: string;
    createdAt?: Date;
    tasks?: TaskInput[];
};

type TaskInput = {
    id?: number;
    name?: string;
    description?: string;
    priority?: string;
    storyPoints?: number;
    startDate?: Date;
    endDate?: Date;
    users?: UserInput[];
};

type ProfileInput = {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
};

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
};

export { UserInput, GroupInput, BoardInput, TaskInput, ProfileInput, AuthenticationResponse };