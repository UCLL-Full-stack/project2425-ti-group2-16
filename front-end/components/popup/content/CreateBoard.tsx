import boardService from '@/services/boardService';
import React from 'react';
import { mutate } from 'swr';

interface Props {
    setPopup: (popup: boolean) => void;
    groupId: number;
}

const CreateBoard: React.FC<Props> = ({setPopup, groupId}) => {
    const [error, setError] = React.useState<string | null>(null);

    const createBoard = async (name: string, description: string) => {
        const response = await boardService.createBoard(name, description, groupId);
        if (response.ok) {
            mutate(`group/${groupId}/boards`);
            setPopup(false);
        } else {
            setError('Failed to create board.');
        };
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
                />
                <input
                    className="border border-gray-200 rounded p-2 m-2"
                    type="text"
                    placeholder="Description"
                    id="description"
                />
                <button
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                    onClick={() => createBoard(
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

export default CreateBoard;