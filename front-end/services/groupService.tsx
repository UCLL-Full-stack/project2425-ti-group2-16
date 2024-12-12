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

export default {
    getGroups,
};