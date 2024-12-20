import Head from "next/head";
import Header from "@/components/Header";
import RegisterForm from "@components/registerForm";
import styles from "@styles/home.module.css";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Register: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("header.register")}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>{t("header.register")}</h1>
        <RegisterForm />
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

export default Register;
