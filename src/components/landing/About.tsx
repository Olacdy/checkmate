import { FC } from 'react';

type AboutProps = {};

const About: FC<AboutProps> = ({}) => {
  return (
    <section className='flex w-full flex-col items-center justify-start pt-56'>
      <h2 className='section-header'>
        Delegate your data validation to a CheckMate
      </h2>
    </section>
  );
};

export default About;
