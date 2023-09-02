import { FC } from 'react';

import ContactForm from '@/components/landing/ContactForm';

type ContactProps = {};

const Contact: FC<ContactProps> = ({}) => {
  return (
    <section className='flex w-full flex-col items-start gap-16 pt-44'>
      <div className='flex flex-col gap-2'>
        <h2 className='section-header'>Have a suggestion?</h2>
        <div className='flex flex-col gap-5'>
          <p className='body-text max-w-md'>
            We'll be glad to hear more about you ideas on how to improve your
            experience with this application.
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
