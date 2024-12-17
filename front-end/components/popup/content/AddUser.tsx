import groupService from '@/services/groupService';
import { User } from '@/types';
import React from 'react';
import { mutate } from 'swr';

interface Props {
    users: User[];
    groupId: number;
}

const AddUser: React.FC<Props> = ({ users, groupId }) => {
    const [error, setError] = React.useState<string | null>(null);

    const addUser = async (userId: number | undefined) => {
        setError(null);
        if (!userId) {
            setError('Something went wrong');
            return;
        };

        const response = await groupService.addUserToGroup(groupId, userId);
        if (response.ok) {
            await mutate(`group/${groupId}/management`);
            mutate(`usersNotInGroup${groupId}`);
        } else {
            setError('Something went wrong');
        };

    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Users</h2>
            {error && <p className="text-red-500">{error}</p>}
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Add</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{user.username}</td>
                            <td className="py-2 px-4 border-b">{user.profile?.email}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                                    onClick={() => addUser(user.id)}
                                >
                                    Add
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default AddUser;