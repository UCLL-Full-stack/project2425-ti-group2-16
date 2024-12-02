const getToken = () => {
    const user = localStorage.getItem("loggedInUser") || "";
    return JSON.parse(user).token
};

const getAllTeams = async () => {
    const token = getToken();
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

export default {
    getAllTeams,
}