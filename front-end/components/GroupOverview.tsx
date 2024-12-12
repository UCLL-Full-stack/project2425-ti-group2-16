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
        router.push(`/groups/${groupId}`);
    };

    return (
        <>
            {groups &&
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-100">
                            <th className="py-2 px-4 border-b border-gray-200">Name</th>
                            <th className="py-2 px-4 border-b border-gray-200">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map(group => (
                            <tr key={group.id} className="hover:bg-gray-50" onClick={goToGroupBoards(group.id)}>
                                <td className="py-2 px-4 border-b border-gray-200">{group.name}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{group.description}</td>
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