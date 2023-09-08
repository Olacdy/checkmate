import { FC, HTMLAttributes } from 'react';

import Image from 'next/image';

import OAuthButtons from '@/components/auth/oauth-buttons';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type AuthCardProps = {} & HTMLAttributes<HTMLDivElement>;

const AuthCard: FC<AuthCardProps> = ({ className, ...props }) => {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>
          <div className='-ml-2 flex items-center gap-1'>
            <div className='relative h-16 w-16'>
              <Image
                className='hidden dark:block'
                src='/logo-footer-dark.webp'
                alt='Footer logo'
                fill
              />
              <Image
                className='dark:hidden'
                src='/logo-footer.webp'
                alt='Footer logo dark'
                fill
              />
            </div>

            <span className='text-lg text-oxford-blue/70 dark:text-off-white md:text-xl'>
              CheckMate
            </span>
          </div>
        </CardTitle>
        <CardDescription className='text-base'>
          Start creating your validation schemas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OAuthButtons />
      </CardContent>
    </Card>
  );
};

export default AuthCard;
