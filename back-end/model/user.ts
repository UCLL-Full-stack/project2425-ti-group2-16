import { Group } from "./group";
import { Profile } from "./profile";
import { Task } from "./task";
import {
    User as UserPrisma,
    Profile as ProfilePrisma,
    Group as GroupPrisma,
    Board as BoardPrisma,
    Status as StatusPrisma,
    Task as TaskPrisma
} from '@prisma/client'

export class User {
    private id?: number;
    private username: string;
    private hashedPassword: string;
    private profile?: Profile;
    private memberOfGroups: Group[];
    private leaderOfGroups: Group[];

    constructor(user: {
        id?: number;
        username: string;
        hashedPassword: string;
        profile?: Profile;
        memberOfGroups?: Group[];
        leaderOfGroups?: Group[];
    }) {
        this.id = user.id;
        this.username = user.username;
        this.hashedPassword = user.hashedPassword;
        this.profile = user.profile || undefined;
        this.memberOfGroups = user.memberOfGroups || [];
        this.leaderOfGroups = user.leaderOfGroups || [];
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getHashedPassword(): string {
        return this.hashedPassword;
    }

    getProfile(): Profile | undefined {
        return this.profile;
    }

    getMemberOfGroups(): Group[] {
        return this.memberOfGroups;
    }

    getLeaderOfGroups(): Group[] {
        return this.leaderOfGroups;
    }

    // setters
    setUsername(username: string): void {
        this.username = username;
    }

    setHashedPassword(hashedPassword: string): void {
        this.hashedPassword = hashedPassword;
    }

    setProfile(profile: Profile): void {
        this.profile = profile;
    }

    setMemberOfGroups(groups: Group[]): void {
        this.memberOfGroups = groups;
    }

    setLeaderOfGroups(groups: Group[]): void {
        this.leaderOfGroups = groups;
    }

    // methods
    equals(otherUser: User): boolean {
        let profilesAreEqual = true;
        if (this.profile && otherUser.getProfile()) {
            profilesAreEqual = this.profile.equals(otherUser.getProfile()!);
        } else if (this.profile || otherUser.getProfile()) {
            profilesAreEqual = false;
        }

        return (
            this.username === otherUser.getUsername() &&
            this.hashedPassword === otherUser.getHashedPassword() &&
            profilesAreEqual &&
            this.memberOfGroups.every((group, index) => {
                return group.equals(otherUser.getMemberOfGroups()[index]);
            }) &&
            this.leaderOfGroups.every((group, index) => {
                return group.equals(otherUser.getLeaderOfGroups()[index]);
            })
        );
    }

    static from({
        id,
        username,
        hashedPassword,
        profile,
        memberOfGroups,
        leaderOfGroups,
    }: UserPrisma & { profile: ProfilePrisma | null, memberOfGroups: (GroupPrisma & {leader: (UserPrisma & {profile: (ProfilePrisma | null)}), boards: (BoardPrisma & {statuses: (StatusPrisma & {tasks: TaskPrisma[]})[]})[]})[], leaderOfGroups: (GroupPrisma & {leader: (UserPrisma & {profile: (ProfilePrisma | null)}), boards: (BoardPrisma & {statuses: (StatusPrisma & {tasks: TaskPrisma[]})[]})[]})[]}) {
        return new User({
            id,
            username,
            hashedPassword,
            profile: profile ? Profile.from(profile) : undefined,
            memberOfGroups: memberOfGroups.map((memberOfGroup) => Group.fromWithoutUsers(memberOfGroup)),
            leaderOfGroups: leaderOfGroups.map((leaderOfGroup) => Group.fromWithoutUsers(leaderOfGroup)),
        });
    };

    static fromWithoutGroups({
        id,
        username,
        hashedPassword,
        profile,
    }: UserPrisma & { profile: ProfilePrisma | null }) {
        return new User({
            id,
            username,
            hashedPassword,
            profile: profile ? Profile.from(profile) : undefined,
        });
    };
}
