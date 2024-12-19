import React from 'react';
import { Board, Status } from '@/types';
import StatusColumn from './StatusColumn';

interface Props {
    board: Board;
    setPopup: (popup: Status | null) => void;
}

const BoardContent: React.FC<Props> = ({ board, setPopup }) => {
    return (
        <>
            {board &&
                <>
                    <div className='flex'>
                        {board.statuses.map(status => (
                            <StatusColumn status={status} setPopup={setPopup} />
                        ))}
                    </div>
                </>
            }
            {!board && <p className="text-gray-500">No board found.</p>}
        </>
    );
};

export default BoardContent;