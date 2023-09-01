import { FC } from 'react';

import { Line } from '@/components/ui/line';
import Step from '@/components/ui/step';

import SchemaCreationLayout from '@/components/landing/SchemaCreationLayout';
import CopyLink from '@/components/ui/copy-link';
import JSONSnippet from './JSONSnippet';

type AboutProps = {};

const About: FC<AboutProps> = ({}) => {
  return (
    <section className='flex w-full flex-col items-center justify-start gap-32 pt-56'>
      <div className='flex flex-col items-center justify-start'>
        <h2 className='section-header'>Codeless validation</h2>
        <p className='body-text'>Define once - use everywhere</p>
      </div>

      <div className='flex w-full items-center justify-between'>
        <div className='flex max-w-sm flex-col items-start justify-start gap-5'>
          <Step stepCount={1} />
          <div className='flex flex-col gap-2'>
            <h3 className='step-header'>Create a schema with UI tool</h3>
            <p className='body-text text-left'>
              Utilize convenient UI tool to create a validation schema by
              defining and ordering fields
            </p>
          </div>
        </div>
        <Line className='flex-1' />
        <div className='flex w-full max-w-md flex-col items-center pl-10'>
          <div className='w-full rounded-md border-2 border-slate-600/20'>
            <header className='w-full border-slate-600/20 bg-slate-600/20'>
              <div className='flex items-center gap-3 p-2'>
                <span className='h-3 w-3 rounded-full bg-slate-500' />
                <span className='h-3 w-3 rounded-full bg-slate-500' />
                <span className='h-3 w-3 rounded-full bg-slate-500' />
              </div>
            </header>
            <SchemaCreationLayout className='bg-oxford-blue-dark' />
          </div>
        </div>
      </div>

      <div className='flex w-full items-center justify-between'>
        <div className='flex max-w-sm flex-col items-start justify-start gap-5'>
          <Step stepCount={2} />
          <div className='flex flex-col gap-2'>
            <h3 className='step-header'>Get a URL to defined scheme</h3>
            <p className='body-text text-left'>
              When defining a scheme you get a URL to an endpoint to which you
              can send JSON data that will get validated
            </p>
          </div>
        </div>
        <Line className='flex-1' />
        <CopyLink
          link={'https://checkmate.com/api/schema/1'}
          className='pl-10'
        />
      </div>

      <div className='flex w-full items-center justify-between'>
        <div className='flex max-w-sm flex-col items-start justify-start gap-5'>
          <Step stepCount={3} />
          <div className='flex flex-col gap-2'>
            <h3 className='step-header'>Validate data</h3>
            <p className='body-text text-left'>
              Send a POST request with your data in JSON format and retrieve
              detailed message of validation results
            </p>
          </div>
        </div>
        <Line className='flex-1' />
        <JSONSnippet className='pl-10' />
      </div>
    </section>
  );
};

export default About;
