import { about } from '@/helpers/data';
import { FC } from 'react';

type AboutProps = {};

const About: FC<AboutProps> = ({}) => {
  return (
    <section className='flex w-full flex-col items-center justify-start gap-20 pt-56'>
      <h2 className='section-header max-w-md'>
        Delegate your data validation to a CheckMate
      </h2>
      <div className='grid w-full grid-cols-1 justify-items-center gap-y-10 md:grid-cols-2'>
        {about.map((aboutItem, index) => {
          return (
            <div className='flex max-w-[22rem] flex-col gap-3' key={index}>
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
