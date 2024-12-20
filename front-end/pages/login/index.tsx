import Head from "next/head";
import Header from "@components/header";
import LoginForm from "@components/loginForm";
import styles from "@styles/home.module.css";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Login: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("header.login")}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>{t("header.login")}</h1>
        <LoginForm />
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

export default Login;
