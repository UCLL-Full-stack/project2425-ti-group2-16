import Head from 'next/head';
import Header from '@/components/Header';
import styles from '@styles/home.module.css';
import { Board, Status } from '@/types';
import useSWR from 'swr';
import boardService from '@/services/boardService';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Popup from '@/components/popup/Popup';
import BoardContent from '@/components/board/BoardContent';
import CreateTask from '@/components/popup/content/CreateTask';

const BoardPage: React.FC = () => {
    const [popup, setPopup] = useState<Status | null>(null);

    const router = useRouter();
    const { boardId } = router.query;

    const fetcher = async (): Promise<Board> => {
        const response = await boardService.getBoardById(Number(boardId));
        return response.json();
    };

    const { data: board, error } = useSWR<Board>(boardId ? `board${boardId}` : null, fetcher);

    return (
        <>
            <Head>
                <title>{board?.name || "Board not found"}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.main}>
                {error && <div>Failed to load board</div>}
                {!error && board && <BoardContent board={board} setPopup={setPopup} />}
                {popup && <Popup setPopup={setPopup} content={<CreateTask setPopup={setPopup} status={popup} boardId={Number(boardId)}/>} />}
            </main>
        </>
    );
};

export default BoardPage;