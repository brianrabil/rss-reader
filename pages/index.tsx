import type { NextPage } from 'next'
import {Layout} from '@/components';
import { useQuery } from '@apollo/client';

const Home: NextPage = () => {
  return (
    <Layout>
      <h1>Hello Next.js</h1>
    </Layout>
  );
}

export default Home
