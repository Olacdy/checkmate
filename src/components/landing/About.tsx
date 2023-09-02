'use client';

import { FC } from 'react';

import { useSectionInView } from '@/hooks/useSectionInView';

import { about } from '@/helpers/data';

type AboutProps = {};

const About: FC<AboutProps> = ({}) => {
  const { ref } = useSectionInView('About');

  return (
    <section
      ref={ref}
      id='about'
      className='flex w-full flex-col items-center justify-start gap-20 pt-56'>
      <h2 className='section-header max-w-md text-center'>
        Delegate your data validation to a CheckMate
      </h2>
      <div className='grid w-full grid-cols-1 justify-items-center gap-y-10 md:grid-cols-2'>
        {about.map((aboutItem, index) => {
          return (
            <div key={index} className='flex max-w-[22rem] flex-col gap-3'>
              <h3 className='paragraph-header'>{aboutItem.title}</h3>
              <p className='body-text'>{aboutItem.content}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default About;
