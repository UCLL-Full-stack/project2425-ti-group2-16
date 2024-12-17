import groupService from '@/services/groupService';
import React from 'react';
import { mutate } from 'swr';

interface Props {
    setPopup: (popup: boolean) => void;
}

const CreateGroup: React.FC<Props> = ({setPopup}) => {
    const [error, setError] = React.useState<string | null>(null);

    const createGroup = async (name: string, description: string) => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        const username = loggedInUser ? JSON.parse(loggedInUser).username : null;
        if (!username) {
            setError('You must be logged in to create a group.');
            return;
        }
        const response = await groupService.createGroup(username, name, description);
        if (response.ok) {
            mutate('groups');
            setPopup(false);
        } else {
            setError('Failed to create group.');
        };
    };

    return (
        <div className="p-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <h2 className="text-2xl font-bold mb-4 text-center">Create Group</h2>
            <div className="flex flex-col items-center">
                <input
                    className="border border-gray-200 rounded p-2 m-2"
                    type="text"
                    placeholder="Name"
                    id="name"
                />
                <input
                    className="border border-gray-200 rounded p-2 m-2"
                    type="text"
                    placeholder="Description"
                    id="description"
                />
                <button
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                    onClick={() => createGroup(
                        (document.getElementById('name') as HTMLInputElement).value,
                        (document.getElementById('description') as HTMLInputElement).value
                    )}
                >
                    Create
                </button>
            </div>
        </div>
    )
};

export default CreateGroup;