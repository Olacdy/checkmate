import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/components/icons';

type FooterProps = {};

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className='mx-auto flex w-full max-w-5xl items-end pt-40'>
      <div className='flex w-full flex-col-reverse items-center justify-between gap-8 md:flex-row md:gap-0'>
        <div className='flex flex-col items-start gap-1'>
          <Image
            className='hidden dark:block'
            src='/logo-footer-dark.webp'
            alt='Footer logo'
            width={50}
            height={36}
          />
          <Image
            className='dark:hidden'
            src='/logo-footer.webp'
            alt='Footer logo dark'
            width={50}
            height={36}
          />
          <span className='text-xs text-oxford-blue/70 dark:text-off-white md:text-sm'>
            Copyright &copy; 2023 CheckMate. All rights reserved.
          </span>
        </div>
        <nav>
          <ul className='flex items-center justify-center gap-6 md:gap-3'>
            <li>
              <Link
                className='group'
                href='https://www.linkedin.com/in/oleg-didechkin/'
                target='_blank'
                rel='noopener noreferrer'>
                <Icons.linkedin className='h-7 w-7 fill-oxford-blue group-hover:fill-oxford-blue/90 dark:fill-off-white dark:group-hover:fill-off-white/60 md:h-10 md:w-10' />
              </Link>
            </li>
            <li>
              <Link
                className='group'
                href='https://twitter.com/Olacdy'
                target='_blank'
                rel='noopener noreferrer'>
                <Icons.twitter className='h-7 w-7 fill-oxford-blue group-hover:fill-oxford-blue/90 dark:fill-off-white dark:group-hover:fill-off-white/60 md:h-10 md:w-10' />
              </Link>
            </li>
            <li className='-ml-2'>
              <Link
                className='group'
                href='https://github.com/Olacdy/checkmate'
                target='_blank'
                rel='noopener noreferrer'>
                <Icons.github className='h-9 w-9 fill-oxford-blue group-hover:fill-oxford-blue/90 dark:fill-off-white dark:group-hover:fill-off-white/60 md:h-12 md:w-12' />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
