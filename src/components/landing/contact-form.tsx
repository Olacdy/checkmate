'use client';

import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { toast } from 'sonner';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import sendEmail from '@/actions/send-email';

import { contactSchema } from '@/schemas/forms-schemas';

type ContactFormProps = {};

const ContactForm: FC<ContactFormProps> = ({}) => {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    form.reset();
    toast.message('Thank you!', {
      description: 'Your suggestion submitted successfuly.',
    });

    await sendEmail(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full max-w-md flex-col items-center gap-y-3 self-center'>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder='John' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder='Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder='john.doe@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Textarea
                  placeholder='Tell us about your problem. What kind of suggestion are you willing to share?'
                  className='h-40 resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='self-end bg-oxford-blue/90 text-base text-off-white hover:bg-oxford-blue/70'>
          Send Suggestion
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
