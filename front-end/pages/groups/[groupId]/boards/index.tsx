import Head from 'next/head';
import Header from '@/components/Header';
import BoardOverview from '@components/BoardOverview';
import styles from '@styles/home.module.css';
import { Board } from '@/types';
import useSWR from 'swr';
import boardService from '@/services/boardService';
import { useRouter } from 'next/router';
import React from 'react';
import Popup from '@/components/popup/Popup';
import CreateBoard from '@/components/popup/content/CreateBoard';

const Boards: React.FC = () => {
    const [popup, setPopup] = React.useState(false);

    const router = useRouter();
    const { groupId } = router.query;

    const fetcher = async (): Promise<Board[]> => {
        const response = await boardService.getBoardsWithGroupId(groupId as string);
        return response.json();
    };

    const { data: boards = [], error } = useSWR<Board[]>(groupId ? `group/${groupId}/boards` : null, fetcher);

    return (
        <>
            <Head>
                <title>Boards</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.main}>
                <h1>Your Boards</h1>
                <button
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 mb-4"
                onClick={() => setPopup(true)}
                > Create Board </button>
                {error && <div>Failed to load boards</div>}
                {!error && boards && <BoardOverview boards={boards} />}
                {popup && <Popup setPopup={setPopup} content={<CreateBoard setPopup={setPopup} groupId={groupId as unknown as number}/>} />}
            </main>
        </>
    );
};

export default Boards;