import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Icons } from './Icons';

type FooterProps = {};

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className='mx-auto flex w-full max-w-5xl items-end pt-40'>
      <div className='flex w-full items-center justify-between'>
        <div className='flex flex-col items-start gap-1'>
          <Image
            src='/footer-logo.webp'
            alt='Footer logo'
            width={50}
            height={36}
          />
          <span className='text-sm text-off-white'>
            Copyright &copy; 2023 CheckMate. All rights reserved.
          </span>
        </div>
        <nav>
          <ul className='flex items-center justify-center gap-3'>
            <li>
              <Link
                className='group'
                href='https://www.linkedin.com/in/oleg-didechkin/'
                target='_blank'
                rel='noopener noreferrer'>
                <Icons.linkedin className='h-10 w-10 fill-off-white group-hover:fill-off-white/60' />
              </Link>
            </li>
            <li>
              <Link
                className='group'
                href='https://twitter.com/Olacdy'
                target='_blank'
                rel='noopener noreferrer'>
                <Icons.twitter className='h-10 w-10 fill-off-white group-hover:fill-off-white/60' />
              </Link>
            </li>
            <li className='-ml-2'>
              <Link
                className='group'
                href='https://github.com/Olacdy'
                target='_blank'
                rel='noopener noreferrer'>
                <Icons.github className='h-12 w-12 fill-off-white group-hover:fill-off-white/60' />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
