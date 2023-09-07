'use client';

import { FC } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import CopyLink from '@/components/ui/copy-link';
import { Line } from '@/components/ui/line';
import Step from '@/components/ui/step';

import JSONSnippet from '@/components/landing/code-snippet';
import SchemaCreationLayout from '@/components/landing/schema-creation-layout';

import { useSectionInView } from '@/hooks/useSectionInView';

type ProductProps = {};

const Product: FC<ProductProps> = ({}) => {
  const { ref } = useSectionInView('Product');

  return (
    <section
      ref={ref}
      id='product'
      className='flex w-full flex-col items-center justify-start gap-24 pt-56 sm:gap-32'>
      <div className='flex flex-col items-center justify-start'>
        <h2 className='section-header text-center'>Codeless validation</h2>
        <p className='body-text'>Define once - use everywhere</p>
      </div>

      <div className='step-container'>
        <div className='step'>
          <Step stepCount={1} />
          <div className='flex flex-col gap-2'>
            <h3 className='paragraph-header'>Create a schema with UI tool</h3>
            <p className='body-text text-left'>
              Utilize convenient UI tool to create a validation schema by
              defining and ordering fields
            </p>
          </div>
        </div>
        <Line className='hidden flex-1 lg:block' />
        <div className='flex w-full flex-col items-center md:max-w-md md:pl-10'>
          <div className='w-full rounded-md border-2 border-slate-300 dark:border-slate-700'>
            <header className='w-full rounded-t-[0.25rem] bg-slate-300 dark:bg-slate-700'>
              <div className='flex items-center gap-3 p-2'>
                <span className='h-3 w-3 rounded-full bg-slate-500' />
                <span className='h-3 w-3 rounded-full bg-slate-500' />
                <span className='h-3 w-3 rounded-full bg-slate-500' />
              </div>
            </header>
            <SchemaCreationLayout className='bg-oxford-blue dark:bg-oxford-blue-dark' />
          </div>
        </div>
      </div>

      <div className='step-container'>
        <div className='step'>
          <Step stepCount={2} />
          <div className='flex flex-col gap-2'>
            <h3 className='paragraph-header'>Get a URL to defined scheme</h3>
            <p className='body-text text-left'>
              When defining a scheme you get a URL to an endpoint to which you
              can send JSON data that will get validated
            </p>
          </div>
        </div>
        <Line className='hidden flex-1 lg:block' />
        <CopyLink
          link={'https://checkmate.com/api/schema/1'}
          className='md:max-w-md md:pl-10'
        />
      </div>

      <div className='step-container'>
        <div className='step'>
          <Step stepCount={3} />
          <div className='flex flex-col gap-2'>
            <h3 className='paragraph-header'>Validate data</h3>
            <p className='body-text text-left'>
              Send a POST request with your data in JSON format and retrieve
              detailed message of validation results
            </p>
          </div>
        </div>
        <Line className='hidden flex-1 lg:block' />
        <JSONSnippet className='md:max-w-sm md:pl-10' />
      </div>

      <Link className='mt-12 self-start md:-mt-20' href='/sign-in'>
        <Button className='px-10 py-7 text-xl '>Try it now</Button>
      </Link>
    </section>
  );
};

export default Product;
