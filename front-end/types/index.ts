export type User = {
    id?: number;
    username: string;
    hashedPassword: string;
    profile?: Profile;
    memberOfGroups: Group[];
    leaderOfGroups: Group[];
    tasks: Task[];
};

export type Profile = {
    id?: number;
    email: string;
    bio: string;
    firstName: string;
    lastName: string;
};

export type Group = {
    id?: number;
    name: string;
    description: string;
    createdAt: Date;
    users: User[];
    leader: User;
    boards: Board[];
};

export type Board = {
    id?: number;
    name: string;
    description: string;
    updatedAt: Date;
    statuses: Status[];
};

export type Status = {
    id?: number;
    name: string;
    tasks: Task[];
};

export type Task = {
    id?: number;
    name: string;
    description: string;
    priority: string;
    storyPoints: number;
    startDate: Date;
    endDate: Date;
    users: User[];
};