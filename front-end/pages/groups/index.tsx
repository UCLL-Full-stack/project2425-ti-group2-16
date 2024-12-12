import Head from 'next/head';
import Header from '@/components/Header';
import GroupOverview from '@components/GroupOverview';
import styles from '@styles/home.module.css';
import { Group } from '@/types';
import useSWR from 'swr';
import groupService from '@/services/groupService';

const Groups: React.FC = () => {
  const fetcher = async (): Promise<Group[]> => {
    const response = await groupService.getGroups();
    return response.json();
  };

  const { data: groups = [], error } = useSWR<Group[]>('groups', fetcher);

  return (
    <>
      <Head>
        <title>Groups</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>Your groups</h1>
        {error && <div>Failed to load groups</div>}
        {!error && <GroupOverview groups={groups} />}
      </main>
    </>
  );
};

export default Groups;