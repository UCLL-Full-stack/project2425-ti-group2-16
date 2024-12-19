import React from 'react';

interface Props {
    content: JSX.Element;
    setPopup: (popup: boolean) => void;
}

const Popup: React.FC<Props> = ({ content, setPopup }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-0 rounded-lg relative w-600">
                <button className="absolute top-2 right-2 p-2" onClick={() => setPopup(false)}>X</button>
                {content}
            </div>
        </div>
    );
};

export default Popup;