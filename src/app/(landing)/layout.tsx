import { FC, ReactNode } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';

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
