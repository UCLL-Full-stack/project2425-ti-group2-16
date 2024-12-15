import React from 'react';
import { Group } from '@/types';
import { useRouter } from 'next/router';

interface Props {
    group: Group | undefined;
}

const GroupManagement: React.FC<Props> = ({ group }) => {
    const router = useRouter();

    return (
        <>
            { group &&
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-100">
                            <th className="py-2 px-4 border-b border-gray-200">Username</th>
                            <th className="py-2 px-4 border-b border-gray-200">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={group.leader.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200">{group.leader.username}</td>
                            <td className="py-2 px-4 border-b border-gray-200">Leader</td>
                        </tr>
                        {group.users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b border-gray-200">{user.username}</td>
                                <td className="py-2 px-4 border-b border-gray-200">Member</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            {!group && <p className="text-gray-500">No group found.</p>}
        </>
    );
};

export default GroupManagement;