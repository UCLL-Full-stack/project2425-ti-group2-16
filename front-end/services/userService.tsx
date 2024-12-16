import { Profile } from "@/types";

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

export default {
    createUser,
    login,
};