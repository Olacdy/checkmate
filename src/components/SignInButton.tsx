'use client';

import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import { FC } from 'react';

type SignInButtonProps = {};

const SignInButton: FC<SignInButtonProps> = ({}) => {
  const session = useSession();

  return (
    <>
      {session.status !== 'authenticated' && (
        <Button
          onClick={() => {
            signIn('google');
          }}>
          Sign In
        </Button>
      )}
    </>
  );
};

export default SignInButton;
