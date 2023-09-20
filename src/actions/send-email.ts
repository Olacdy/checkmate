'use server';

import React from 'react';

import { z } from 'zod';

import { Resend } from 'resend';

import SuggestionFormEmail from '@/components/email/suggestion-form-email';

import { contactSchema } from '@/schemas/forms-schemas';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (values: z.infer<typeof contactSchema>) => {
  const { email: senderEmail, firstName, lastName, message } = values;

  await resend.emails.send({
    from: 'CheckMate suggestion <onboarding@resend.dev>',
    to: 'oleg.didechkin@gmail.com',
    subject: 'Suggestion for CheckMate',
    reply_to: senderEmail,
    react: React.createElement(SuggestionFormEmail, {
      senderName: `${firstName} ${lastName}`,
      message: message,
    }),
  });
};

export default sendEmail;
