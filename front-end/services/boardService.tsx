const getToken = () => {
    return JSON.parse(sessionStorage.getItem('loggedInUser') || '{}').token;
}

const getBoards = () => {
    const token = getToken();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getBoardsWithGroupId = (groupId: String) => {
    const token = getToken();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/group?groupId=${groupId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default {
    getBoards,
    getBoardsWithGroupId,
};