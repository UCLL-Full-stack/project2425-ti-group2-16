import taskService from '@/services/taskService';
import { Status } from '@/types';
import React from 'react';
import { mutate } from 'swr';

interface Props {
    setPopup: (popup: Status | null) => void;
    status: Status;
    boardId: number;
}

const CreateTask: React.FC<Props> = ({ setPopup ,status, boardId }) => {
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [priority, setPriority] = React.useState<number>(0);
    const [storyPoints, setStoryPoints] = React.useState<number>(0);
    const [startDate, setStartDate] = React.useState<string>('');
    const [endDate, setEndDate] = React.useState<string>('');

    const [nameError, setNameError] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const createTask = async (name: string, description: string) => {
        if (!status.id) {
            setError('Failed to create task.');
            return;
        }
        const response = await taskService.createTask(name, description, priority, storyPoints, startDate, endDate, status.id);
        if (response.ok) {
            mutate(`board${boardId}`);
            setPopup(null);
        } else {
            setError('Failed to create task.');
        };
    };

    const handleSubmit = () => {
        setError(null);
        setNameError(null);
        if (!name) {
            setNameError('Name is required.');
            return;
        }
        createTask(name, description);
    };

    return (
        <div className="p-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <h2 className="text-2xl font-bold mb-4 text-center">Create Task</h2>
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
                <input
                    className="border border-gray-200 rounded p-2 m-2"
                    type="number"
                    placeholder="Priority"
                    id="priority"
                    value={priority}
                    onChange={(event) => setPriority(parseInt(event.target.value))}
                />
                <input
                    className="border border-gray-200 rounded p-2 m-2"
                    type="number"
                    placeholder="Story Points"
                    id="storyPoints"
                    value={storyPoints}
                    onChange={(event) => setStoryPoints(parseInt(event.target.value))}
                />
                <input
                    className="border border-gray-200 rounded p-2 m-2"
                    type="date"
                    placeholder="Start Date"
                    id="startDate"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                />
                <input
                    className="border border-gray-200 rounded p-2 m-2"
                    type="date"
                    placeholder="End Date"
                    id="endDate"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
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

export default CreateTask;