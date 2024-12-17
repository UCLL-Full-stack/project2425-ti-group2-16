import Head from 'next/head';
import Header from '@/components/Header';
import GroupManagement from '@components/GroupManagement';
import styles from '@styles/home.module.css';
import { Group, User } from '@/types';
import useSWR, { mutate } from 'swr';
import groupService from '@/services/groupService';
import { useRouter } from 'next/router';
import { use, useEffect, useState } from 'react';
import userService from '@/services/userService';
import Popup from '@/components/popup/Popup';
import AddUser from '@/components/popup/content/AddUser';

const Users: React.FC = () => {
    const [popup, setPopup] = useState<boolean>(false);

    const router = useRouter();
    const { groupId } = router.query;

    useEffect(() => {
        mutate(`usersNotInGroup${groupId}`);
    }, [popup]);

    const userFetcher = async (): Promise<User[]> => {
        const response = await userService.getUsers();
        if (group && response.ok) {
            const usersData = await response.json();
            const filteredUsers = usersData.filter((user: User) => ![...group.users, group.leader].map(a => a.id).includes(user.id));
            return filteredUsers;
        } else {
            return [];
        }
    };

    const { data: users, error: userError } = useSWR<User[]>(groupId ? `usersNotInGroup${groupId}` : null, userFetcher);

    useEffect(() => {
        if (popup) {
            mutate(users);
        }
    }, [popup]);

    const groupFetcher = async (): Promise<Group> => {
        const response = await groupService.getGroupById(groupId as string);
        return response.json();
    };

    const { data: group, error: groupError } = useSWR<Group>(groupId ? `group/${groupId}/management` : null, groupFetcher);

    return (
        <>
            <Head>
                <title>Management</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.main}>
                {popup && users && <Popup setPopup={setPopup} content={<AddUser groupId={groupId as unknown as number} users={users}/>}/>}
                {groupError && <div>Failed to get group</div>}
                {group && <h1>{group.name}</h1>}
                {!groupError && group && <GroupManagement group={group} openAddUserPopup={setPopup}/>}
            </main>
        </>
    );
};

export default Users;