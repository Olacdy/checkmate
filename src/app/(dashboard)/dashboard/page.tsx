import { FC } from 'react';

type pageProps = {};

const page: FC<pageProps> = ({}) => {
  return (
    <section className='flex flex-1 p-4 pl-0'>
      <div className='flex-1 rounded-lg bg-slate-300 dark:bg-oxford-blue-dark'></div>
    </section>
  );
};

export default page;
