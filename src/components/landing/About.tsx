import { FC } from 'react';

import { Line } from '@/components/ui/line';
import Step from '@/components/ui/step';

import SchemaCreationLayout from '@/components/landing/SchemaCreationLayout';

type AboutProps = {};

const About: FC<AboutProps> = ({}) => {
  return (
    <section className='flex w-full flex-col items-center justify-start gap-32 pt-56'>
      <div className='flex flex-col items-center justify-start'>
        <h2 className='section-header'>Codeless validation</h2>
        <p className='body-text'>Define once - use everywhere</p>
      </div>

      <div className='flex w-full items-center justify-between'>
        <div className='flex max-w-md flex-col items-start justify-start gap-5'>
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
        <div className='flex w-full max-w-sm flex-col items-center'>
          <div className='w-full rounded-md border-2 border-slate-600/20'>
            <header className='w-full border-slate-600/20 bg-slate-600/20'>
              <div className='flex items-center gap-3 p-2'>
                <span className='h-3 w-3 rounded-full bg-slate-500' />
                <span className='h-3 w-3 rounded-full bg-slate-500' />
                <span className='h-3 w-3 rounded-full bg-slate-500' />
              </div>
            </header>
            <SchemaCreationLayout />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
