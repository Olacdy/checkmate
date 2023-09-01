import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { ThemeSwitch } from './ThemeSwitch';
import { Button } from './ui/button';

type HeaderProps = {};

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className='fixed inset-x-0 z-50 mx-auto mt-4 w-full max-w-5xl rounded-full bg-off-white font-body'>
      <nav className='px-4'>
        <ul className='flex items-center justify-between'>
          <li className='flex-1'>
            <Link href='/'>
              <Image
                src='/Logo.webp'
                alt='CheckMate Logo'
                width={280}
                height={100}
              />
            </Link>
          </li>
          <li className='flex-1'>
            <ul className='flex items-center justify-center gap-10 pt-1'>
              <li>
                <Link href='#product'>
                  <Button
                    variant='link'
                    className='nav-link dark:text-oxford-blue-dark'>
                    Product
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='#about'>
                  <Button
                    variant='link'
                    className='nav-link dark:text-oxford-blue-dark'>
                    About
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='#contact'>
                  <Button
                    variant='link'
                    className='nav-link dark:text-oxford-blue-dark'>
                    Contact
                  </Button>
                </Link>
              </li>
            </ul>
          </li>
          <li className='flex flex-1 items-center justify-end gap-7'>
            <Link href='/sign-in'>
              <Button className='bg-crayola-blue text-lg text-off-white hover:bg-crayola-blue/70 dark:bg-crayola-blue dark:text-off-white dark:hover:bg-crayola-blue/70'>
                Start for free
              </Button>
            </Link>
            <ThemeSwitch />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
