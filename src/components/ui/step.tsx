import { FC } from 'react';

type StepProps = {
  stepCount: number;
};

const Step: FC<StepProps> = ({ stepCount }) => {
  return (
    <span className='relative flex h-12 w-12 items-center justify-center rounded-full bg-crayola-blue text-lg text-off-white'>
      {stepCount}
    </span>
  );
};

export default Step;
