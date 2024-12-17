import { Profile } from "@/types";

const getToken = () => {
    return JSON.parse(sessionStorage.getItem('loggedInUser') || '{}').token;
}

const createUser = (name: string, password: string, profile?: Profile) => {
    const data = {
        username: name,
        password: password,
        profile: profile
    };

    const jsonData = JSON.stringify(data);

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: jsonData
    });
};

const login = (name: string, password: string) => {
    const data = {
        username: name,
        password: password,
    };

    const jsonData = JSON.stringify(data);

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: jsonData
    });
};

const getUsers = () => {
    const token = getToken();
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export default {
    createUser,
    login,
    getUsers
};