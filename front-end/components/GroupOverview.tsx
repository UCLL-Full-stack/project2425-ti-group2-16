import React from 'react';
import { Group } from '@/types';
import { useRouter } from 'next/router';

interface Props {
    groups: Group[];
}

const GroupOverview: React.FC<Props> = ({ groups }) => {
    const router = useRouter();
    
    const goToGroupBoards = (groupId?: number) => () => {
        if (!groupId) {
            return;
        }
        router.push(`/groups/${groupId}/boards`);
    };

    const goToGroupManagement = (groupId?: number) => () => {
        if (!groupId) {
            return;
        }
        router.push(`/groups/${groupId}/management`);
    };

    return (
        <>
            {groups &&
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-100">
                            <th className="py-2 px-4 border-b border-gray-200">Name</th>
                            <th className="py-2 px-4 border-b border-gray-200">Description</th>
                            <th className="py-2 px-4 border-b border-gray-200">Boards</th>
                            <th className="py-2 px-4 border-b border-gray-200">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map(group => (
                            <tr key={group.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b border-gray-200">{group.name}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{group.description}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={goToGroupBoards(group.id)}>Boards</button>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={goToGroupManagement(group.id)}>Manage</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            {!groups && <p className="text-gray-500">No groups found.</p>}
        </>
    );
};

export default GroupOverview;