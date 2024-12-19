const getToken = () => {
    return JSON.parse(sessionStorage.getItem('loggedInUser') || '{}').token;
}

const createTask = async (name: string, description: string, priority: number, storyPoints: number, startDate: string, endDate: string, statusId: number) => {
    const token = getToken();
    
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            description,
            priority,
            storyPoints,
            startDate,
            endDate,
            statusId
        })
    });
};

export default {
    createTask,
};