'use client';

import { FC, useState } from 'react';

import { signIn } from 'next-auth/react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

const oauthProviders = [
  { name: 'google', icon: 'google' },
  { name: 'github', icon: 'githubAuth' },
] satisfies {
  name: string;
  icon: keyof typeof Icons;
}[];

type OAuthButtonsProps = {};

const OAuthButtons: FC<OAuthButtonsProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<
    (typeof oauthProviders)[number]['name'] | false
  >(false);

  const handleClick = async (
    provider: (typeof oauthProviders)[number]['name']
  ) => {
    setIsLoading(provider);
    try {
      await signIn(provider);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className='grid w-full grid-cols-1 gap-3'>
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon];

        return (
          <Button
            key={provider.name}
            disabled={!!isLoading}
            className='w-full'
            onClick={() => handleClick(provider.name)}>
            <div className='relative flex items-center justify-center gap-2'>
              <Icon
                className={cn('h-5 w-5 fill-off-white dark:fill-oxford-blue', {
                  '-mr-1 mb-1 h-6 w-6': provider.name === 'github',
                })}
              />
              <span className='text-lg capitalize dark:font-semibold'>
                {provider.name}
              </span>
              {isLoading === provider.name && (
                <span
                  className='absolute -right-7 h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                  role='status'
                />
              )}
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default OAuthButtons;
