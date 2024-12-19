import boardService from '@/services/boardService';
import React from 'react';
import { mutate } from 'swr';

interface Props {
    setPopup: (popup: boolean) => void;
    groupId: number;
}

const CreateBoard: React.FC<Props> = ({setPopup, groupId}) => {
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');

    const [error, setError] = React.useState<string | null>(null);

    const createBoard = async () => {
        const response = await boardService.createBoard(name, description, groupId);
        if (response.ok) {
            mutate(`group/${groupId}/boards`);
            setPopup(false);
        } else {
            setError('Failed to create board.');
        };
    };

    const handleSubmit = () => {
        setError(null);
        if (!name) {
            setError('Name is required.');
            return;
        }
        createBoard();
    };

    return (
        <div className="p-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <h2 className="text-2xl font-bold mb-4 text-center">Create Board</h2>
            <div className="flex flex-col items-center">
                <input
                    className="border border-gray-200 rounded p-2 m-2"
                    type="text"
                    placeholder="Name"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
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

export default CreateBoard;