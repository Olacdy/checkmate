import { FC } from 'react';

import { serverClient } from '@/trpc/server';

import TodoList from '@/components/TodoList';

type pageProps = {};

const page: FC<pageProps> = async ({}) => {
  const todos = await serverClient.getTodos();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <TodoList initialTodos={todos} />
    </main>
  );
};

export default page;
