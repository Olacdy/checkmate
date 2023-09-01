'use client';

import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

type ContactFormProps = {};

const contactSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First name must be at least 1 character.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: "Doesn't look like an email.",
  }),
  message: z
    .string()
    .min(20, {
      message: 'Message must be at least 20 characters.',
    })
    .max(500, {
      message: 'Too long. Max length is 500 characters.',
    }),
});

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
    console.log(values);
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
                <Input className='input' placeholder='John' {...field} />
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
                <Input className='input' placeholder='Doe' {...field} />
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
                <Input
                  className='input'
                  placeholder='john.doe@example.com'
                  {...field}
                />
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
                  className='input h-40 resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='self-end' type='submit'>
          Send Suggestion
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
