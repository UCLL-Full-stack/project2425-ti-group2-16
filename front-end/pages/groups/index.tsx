import Head from 'next/head';
import Header from '@/components/Header';
import GroupOverview from '@components/GroupOverview';
import styles from '@styles/home.module.css';
import { Group } from '@/types';
import useSWR from 'swr';
import groupService from '@/services/groupService';
import React from 'react';
import Popup from '@/components/popup/Popup';
import CreateGroup from '@/components/popup/content/CreateGroup';

const Groups: React.FC = () => {
  const [popup, setPopup] = React.useState(false);

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
        <button
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 mb-4"
          onClick={() => setPopup(true)}
        > Create Group </button>
        {error && <div>Failed to load groups</div>}
        {!error && <GroupOverview groups={groups} />}
        {popup && <Popup content={<CreateGroup setPopup={setPopup} />} setPopup={setPopup} />}
      </main>
    </>
  );
};

export default Groups;