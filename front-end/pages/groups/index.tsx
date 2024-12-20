import Head from "next/head";
import Header from "@/components/Header";
import GroupOverview from "@components/GroupOverview";
import styles from "@styles/home.module.css";
import { Group } from "@/types";
import useSWR from "swr";
import groupService from "@/services/groupService";
import React, { useState, useTransition } from "react";
import Popup from "@/components/popup/Popup";
import CreateGroup from "@/components/popup/content/CreateGroup";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";

const Groups: React.FC = () => {
  const [popup, setPopup] = useState<boolean>(false);

  const fetcher = async (): Promise<Group[]> => {
    const response = await groupService.getGroups();
    return response.json();
  };

  const { data: groups = [], error } = useSWR<Group[]>("groups", fetcher);

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("header.groups")}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>{t("groups.header")}</h1>

        <button
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 mb-4"
          onClick={() => setPopup(true)}
        >
          {" "}
          {t("groups.create")}{" "}
        </button>
        {error && <div>{t("groups.error")}</div>}
        {!error && <GroupOverview groups={groups} />}
        {popup && (
          <Popup
            content={<CreateGroup setPopup={setPopup} />}
            setPopup={setPopup}
          />
        )}
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

export default Groups;
