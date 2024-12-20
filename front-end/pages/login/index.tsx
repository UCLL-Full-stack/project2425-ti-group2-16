import Head from "next/head";
import Header from "@/components/Header";
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
        <table>
          <thead>
            <th>Username</th>
            <th>Password</th>
            <th>Leader of</th>
          </thead>
          <tbody>
            <tr>
              <td>meesv</td>
              <td>mees123</td>
              <td>Group 1</td>
            </tr>
            <tr>
              <td>larsf</td>
              <td>lars123</td>
              <td>Group 2</td>
            </tr>
            <tr>
              <td>jeroenr</td>
              <td>jeroen123</td>
              <td></td>
            </tr>
            <tr>
              <td>johanp</td>
              <td>johan123</td>
              <td></td>
            </tr>
            <tr>
              <td>elkes</td>
              <td>elke123</td>
              <td></td>
            </tr>
          </tbody>
        </table>
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
