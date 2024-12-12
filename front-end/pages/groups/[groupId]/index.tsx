import Head from 'next/head';
import Header from '@/components/Header';
import BoardOverview from '@components/BoardOverview';
import styles from '@styles/home.module.css';
import { Board } from '@/types';
import useSWR from 'swr';
import boardService from '@/services/boardService';
import { useRouter } from 'next/router';

const Boards: React.FC = () => {

    const router = useRouter();
    const { groupId } = router.query;

    const fetcher = async (): Promise<Board[]> => {
        const response = await boardService.getBoardsWithGroupId(groupId as string);
        return response.json();
    };

    const { data: boards = [], error } = useSWR<Board[]>('boards', fetcher);

    return (
        <>
            <Head>
                <title>Boards</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.main}>
                <h1>Your Boards</h1>
                {error && <div>Failed to load boards</div>}
                {!error && <BoardOverview boards={boards} />}
            </main>
        </>
    );
};

export default Boards;