import Head from 'next/head';
import Header from '../components/Header';
import styles from '../styles/home.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from 'next';


const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t('app.title')}</title>
        <meta name="description" content="Kanben Esoteric Edition" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
          <h1>Welcome!</h1>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Home;
