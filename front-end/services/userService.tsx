import { Profile } from "@/types";

const createUser = (name: string, password: string, profile?: Profile) => {
    const data = {
        username: name,
        hashedPassword: password,
        profile: profile
    };

    const jsonData = JSON.stringify(data);

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: jsonData
    });
};

export default { createUser };