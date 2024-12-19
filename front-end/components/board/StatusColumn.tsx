import React from 'react';
import { Status } from '@/types';
import TaskCard from './TaskCard';

interface Props {
    status: Status;
    setPopup: (popup: Status | null) => void;
}

const StatusColumn: React.FC<Props> = ({ status, setPopup }) => {
    return (
        <>
            <div className='flex flex-col p-1 m-2 w-64'>
                <h2 className='text-lg font-semibold text-center pt-2'>{status.name}</h2>
                <div
                className='border p-2 m-2 rounded-lg bg-white shadow-md text-center'
                onClick={() => setPopup(status)}
                >
                    <h1 className='m-0 p-0'>+</h1>
                </div>
                {status.tasks.map(task => (
                    <TaskCard task={task} />
                ))}
            </div>
        </>
    );
};

export default StatusColumn;