import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';
import { FC } from 'react';

type SuggestionFormEmailProps = {
  senderName: string;
  message: string;
};

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

const SuggestionFormEmail: FC<SuggestionFormEmailProps> = ({
  senderName,
  message,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Review a new suggestion</Preview>
      <Tailwind>
        <Body className='bg-white'>
          <Container className='mx-auto w-[560px] px-12 pt-5'>
            {/* TODO: Fix logo size */}
            <Img
              src={`${baseUrl}/logo.webp`}
              width='42'
              height='42'
              alt='CheckMate'
              className='h-[42px] w-[42px] border-8'
            />
            <Heading className='pt-4 text-xl text-[#484848]'>
              Suggestion from {senderName}
            </Heading>
            <Text className='mx-3 text-sm text-[#3c4149]'>{message}</Text>
            <Hr className='mx-6 mt-16 border-[#dfe1e4]' />
            <Link href={baseUrl} className='text-sm text-[#b4becc] '>
              CheckMate
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SuggestionFormEmail;
