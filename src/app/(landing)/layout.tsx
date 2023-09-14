import { FC, ReactNode } from 'react';

import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';

type LandingLayoutProps = {
  children: ReactNode;
};

const LandingLayout: FC<LandingLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
