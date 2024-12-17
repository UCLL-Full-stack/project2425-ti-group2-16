import { User } from "@/types";

const getToken = () => {
    return JSON.parse(sessionStorage.getItem('loggedInUser') || '{}').token;
}

const getGroups = () => {
    const token = getToken();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getGroupById = (groupId: string) => {
    const token = getToken();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const removeUserFromGroup = (groupId: number, userId: number) => {
    const token = getToken();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}/users/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default {
    getGroups,
    getGroupById,
    removeUserFromGroup,
};