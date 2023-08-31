import { FC } from 'react';

import { serverClient } from '@/trpc/server';

import SignInButton from '@/components/SignInButton';
import TodoList from '@/components/TodoList';

type pageProps = {};

const page: FC<pageProps> = async ({}) => {
  const todos = await serverClient.todo.getTodos();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <SignInButton />
      <TodoList initialTodos={todos} />
    </main>
  );
};

export default page;
