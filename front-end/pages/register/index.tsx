import Head from 'next/head';
import Header from '@/components/Header';
import RegisterForm from '@/components/RegisterForm';
import styles from '@styles/home.module.css';


const Register: React.FC = () => {
  return (
    <>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
          <h1>Register</h1>
          <RegisterForm />
      </main>
    </>
  );
};

export default Register;
