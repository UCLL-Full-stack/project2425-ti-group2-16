import groupService from '@/services/groupService';
import React from 'react';
import { mutate } from 'swr';

interface Props {
    setPopup: (popup: boolean) => void;
}

const CreateGroup: React.FC<Props> = ({setPopup}) => {
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');

    const [nameError, setNameError] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const createGroup = async (name: string, description: string) => {
        const response = await groupService.createGroup(name, description);
        if (response.ok) {
            mutate('groups');
            setPopup(false);
        } else {
            setError('Failed to create group.');
        };
    };

    const handleSubmit = () => {
        setError(null);
        setNameError(null);
        if (!name) {
            setNameError('Name is required.');
            return;
        }
        createGroup(name, description);
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
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                {nameError && <p className="text-red-500 text-center">{nameError}</p>}
                <input
                    className="border border-gray-200 rounded p-2 m-2"
                    type="text"
                    placeholder="Description"
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <button
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                    onClick={() => handleSubmit()}
                >
                    Create
                </button>
            </div>
        </div>
    )
};

export default CreateGroup;