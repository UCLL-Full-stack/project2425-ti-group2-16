import Head from 'next/head';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import styles from '@styles/home.module.css';


const Login: React.FC = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
          <h1>Login</h1>
          <LoginForm />
      </main>
    </>
  );
};

export default Login;
