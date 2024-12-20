import Head from 'next/head';
import Header from '@/components/Header';
import BoardOverview from '@components/BoardOverview';
import styles from '@styles/home.module.css';
import { Board, JWT } from '@/types';
import useSWR from 'swr';
import boardService from '@/services/boardService';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Popup from '@/components/popup/Popup';
import CreateBoard from '@/components/popup/content/CreateBoard';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";

const Boards: React.FC = () => {
    const [popup, setPopup] = useState<boolean>(false);
    const [jwt, setJwt] = useState<JWT>({});

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loggedInUser = sessionStorage.getItem('loggedInUser');
            setJwt(JSON.parse(loggedInUser || '{}'));
        }
    }, []);

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
                { jwt.leaderOfGroups?.includes(Number(groupId)) &&
                    <button
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 mb-4"
                    onClick={() => setPopup(true)}
                    > Create Board </button>
                }
                {error && <div>Failed to load boards</div>}
                {!error && boards && <BoardOverview groupId={Number(groupId)} boards={boards} />}
                {popup && <Popup setPopup={setPopup} content={<CreateBoard setPopup={setPopup} groupId={Number(groupId)}/>} />}
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Boards;