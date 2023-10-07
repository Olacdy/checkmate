import { FC, ReactNode } from 'react';

import { Metadata } from 'next';

type ValidationLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'CheckMate | Validation Data',
  description: 'Page to review what data was passed during a validation.',
};

const ValidationLayout: FC<ValidationLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default ValidationLayout;
