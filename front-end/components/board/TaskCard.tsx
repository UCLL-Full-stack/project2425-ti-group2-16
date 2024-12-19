import React from 'react';
import { Task } from '@/types';

interface Props {
    task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
    return (
        <>
            <div className='border p-2 m-2 rounded-lg bg-white shadow-md'>
                <h3 className='text-lg font-semibold'>{task.name}</h3>
                <p className='text-sm text-gray-500'>{task.description}</p>
            </div>
        </>
    );
};

export default TaskCard;