import { FC, HTMLAttributes } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Icons } from '@/components/icons';

import { cn } from '@/lib/utils';

import { SchemaType } from '@/schemas/schemas-schema';

type ReviewSchemaTabsProps = {
  schemas: SchemaType[];
} & HTMLAttributes<HTMLDivElement>;

const ReviewSchemaTabs: FC<ReviewSchemaTabsProps> = ({
  className,
  schemas,
}) => {
  return (
    <Tabs defaultValue='validations' className={cn('flex flex-col', className)}>
      <TabsList>
        <TabsTrigger className='flex gap-2' value='validations'>
          <Icons.validation />
          <span>Validations</span>
        </TabsTrigger>
        <TabsTrigger className='flex gap-2' value='successes'>
          <Icons.success />
          <span>Successes</span>
        </TabsTrigger>
        <TabsTrigger className='flex gap-2' value='errors'>
          <Icons.error />
          <span>Errors</span>
        </TabsTrigger>
      </TabsList>
      <Card className='flex flex-1 border-0 bg-transparent dark:bg-transparent'>
        <CardContent className='flex-1'>
          <TabsContent value='validations'>Validations</TabsContent>
          <TabsContent value='successes'>Successes</TabsContent>
          <TabsContent value='errors'>Errors</TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};

export default ReviewSchemaTabs;
