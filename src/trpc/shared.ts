import { AppRouter } from '@/server';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

import superjson from 'superjson';

export const transformer = superjson;

const getBaseUrl = () => {
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return 'https://' + vercelUrl;
  return 'http://localhost:3000';
};

export const getUrl = () => {
  return getBaseUrl() + '/api/trpc';
};

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
