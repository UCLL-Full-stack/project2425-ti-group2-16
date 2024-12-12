import React from 'react';
import { Board } from '@/types';

interface Props {
    boards: Board[];
}

const BoardOverview: React.FC<Props> = ({ boards }) => {
    return (
        <>
            {boards &&
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-100">
                            <th className="py-2 px-4 border-b border-gray-200">Name</th>
                            <th className="py-2 px-4 border-b border-gray-200">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boards.map(board => (
                            <tr key={board.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b border-gray-200">{board.name}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{board.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            {!boards && <p className="text-gray-500">No boards found.</p>}
        </>
    );
};

export default BoardOverview;