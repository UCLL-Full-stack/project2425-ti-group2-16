import { Profile, User } from "@/types";

const getToken = () => {
    const user = localStorage.getItem("loggedInUser") || "";
    return JSON.parse(user).token
};

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

const loginUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

export default {
    createUser,
    loginUser,
};