import boardService from '@/services/boardService';
import { Status } from '@/types';
import React from 'react';
import { mutate } from 'swr';

interface Props {
    setPopup: (popup: boolean) => void;
    groupId: number;
}

const CreateBoard: React.FC<Props> = ({setPopup, groupId}) => {
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [template, setTemplate] = React.useState<string>('kanban');

    const [error, setError] = React.useState<string | null>(null);

    const createBoard = async (statuses: Status[]) => {
        const response = await boardService.createBoard(name, description, groupId, statuses);
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
        };

        let statuses: Status[] = [];
        if (template === 'kanban') {
            statuses = [
                { name: 'To Do' },
                { name: 'In Progress' },
                { name: 'Done' }
            ];
        } else if (template === 'mad sad glad') {
            statuses = [
                { name: 'Mad' },
                { name: 'Sad' },
                { name: 'Glad' }
            ];
        } else if (template === 'bug reports') {
            statuses = [
                { name: 'Open' },
                { name: 'In Progress' },
                { name: 'Resolved' },
                { name: 'Closed' }
            ];
        }


        createBoard(statuses);
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
                <select
                    className='border border-gray-200 rounded p-2 m-2'
                    name="termplate"
                    id="template"
                    value={template}
                    onChange={(event) => setTemplate(event.target.value)}
                >
                    <option value="kanban">Kanban</option>
                    <option value="mad sad glad">Mad Sad Glad</option>
                    <option value="bug reports">Bug Reports</option>
                </select>
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