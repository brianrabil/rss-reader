import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('reader');
  }, []);

  return (
    <h1>Hello Next.js</h1>
  );
}

export default Home
