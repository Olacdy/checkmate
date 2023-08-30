'use client';

import { FC } from 'react';

import { trpc } from '@/trpc/client';
import { serverClient } from '@/trpc/server';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import TodoForm from './TodoForm';

type TodoListProps = {
  initialTodos: Awaited<ReturnType<(typeof serverClient)['getTodos']>>;
};

const TodoList: FC<TodoListProps> = ({ initialTodos }) => {
  const getTodos = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const checkTodo = trpc.checkTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  return (
    <div>
      <ul>
        {getTodos.data.map((todo) => {
          return (
            <li key={todo.id}>
              <Checkbox
                id={`check-${todo.id}`}
                checked={todo.done}
                onCheckedChange={async (checked) => {
                  checkTodo.mutate({ id: todo.id, done: checked as boolean });
                }}
              />
              <Label htmlFor={`check-${todo.id}`}>{todo.content}</Label>
            </li>
          );
        })}
      </ul>
      <TodoForm addTodo={addTodo} />
    </div>
  );
};

export default TodoList;
