import React from 'react';
import { Group } from '@/types';
import { mutate } from 'swr';
import groupService from '@/services/groupService';

interface Props {
    isLeader: boolean;
    group: Group;
    openAddUserPopup: (popup: boolean) => void;
}

const GroupManagement: React.FC<Props> = ({ isLeader, group, openAddUserPopup }) => {
    const removeUser = (userId?: number) => async () => {
        if (!userId || !group.id) {
            return;
        }
        const response = await groupService.removeUserFromGroup(group.id, userId);
        if (response.status === 200) {
            mutate(`group/${group.id}/management`);
        }
    }

    return (
        <>
            { isLeader &&
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => openAddUserPopup(true)}>Add user</button>
            }
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="w-full bg-gray-100">
                        <th className="py-2 px-4 border-b border-gray-200">Username</th>
                        <th className="py-2 px-4 border-b border-gray-200">Role</th>
                        { isLeader &&
                            <th className="py-2 px-4 border-b border-gray-200">Remove</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr key={group.leader.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b border-gray-200">{group.leader.username}</td>
                        <td className="py-2 px-4 border-b border-gray-200">Leader</td>
                        { isLeader &&
                            <td className="py-2 px-4 border-b border-gray-200"></td>
                        }
                    </tr>
                    {group.users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200">{user.username}</td>
                            <td className="py-2 px-4 border-b border-gray-200">Member</td>
                            { isLeader &&
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={removeUser(user.id)}>Remove</button>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
                </table>
            {!group && <p className="text-gray-500">No group found.</p>}
        </>
    );
};

export default GroupManagement;