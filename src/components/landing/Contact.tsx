'use client';

import { FC } from 'react';

import { useSectionInView } from '@/hooks/useSectionInView';

import ContactForm from '@/components/landing/contact-form';

type ContactProps = {};

const Contact: FC<ContactProps> = ({}) => {
  const { ref } = useSectionInView('Contact');

  return (
    <section
      ref={ref}
      id='contact'
      className='flex w-full flex-col items-start gap-16 pt-44'>
      <div className='flex flex-col gap-2'>
        <h2 className='section-header'>Have a suggestion?</h2>
        <div className='flex flex-col gap-5'>
          <p className='body-text max-w-md'>
            We&apos;ll be glad to hear more about you ideas on how to improve
            your experience with this application.
          </p>
          <p className='body-text max-w-md'>
            Be free to fill and submit a contact form so we could start
            conversation.
          </p>
        </div>
      </div>
      <ContactForm />
    </section>
  );
};

export default Contact;
