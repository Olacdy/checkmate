import { AppRouter } from '@/server';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

import { getBaseUrl } from '@/lib/utils';

import superjson from 'superjson';

export const transformer = superjson;

export const getUrl = () => {
  return getBaseUrl() + '/api/trpc';
};

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
