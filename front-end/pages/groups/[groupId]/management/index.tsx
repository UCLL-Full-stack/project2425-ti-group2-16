import Head from 'next/head';
import Header from '@/components/Header';
import GroupManagement from '@components/GroupManagement';
import styles from '@styles/home.module.css';
import { Group } from '@/types';
import useSWR from 'swr';
import groupService from '@/services/groupService';
import { useRouter } from 'next/router';

const Users: React.FC = () => {

    const router = useRouter();
    const { groupId } = router.query;

    const fetcher = async (): Promise<Group> => {
        const response = await groupService.getGroupById(groupId as string);
        return response.json();
    };

    const { data: group, error } = useSWR<Group>(groupId ? `group/${groupId}` : null, fetcher);

    return (
        <>
            <Head>
                <title>Management</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.main}>
                {group && <h1>{group.name}</h1>}
                {error && <div>Failed to get group</div>}
                {!error && <GroupManagement group={group} />}
            </main>
        </>
    );
};

export default Users;