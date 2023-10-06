import { FC, HTMLAttributes } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Icons } from '@/components/icons';

import ValidationsTable from '@/components/dashboard/validations-table';

import { cn } from '@/lib/utils';

import { ValidationType } from '@/schemas/validation-route-schemas';

type ValidationTabsProps = {
  type: 'single' | 'multiple';
  validations: ValidationType[];
} & HTMLAttributes<HTMLDivElement>;

const ValidationTabs: FC<ValidationTabsProps> = ({
  type,
  className,
  validations,
}) => {
  return (
    <Tabs defaultValue='validations' className={cn('flex flex-col', className)}>
      <TabsList>
        <TabsTrigger className='flex gap-2' value='validations'>
          <Icons.validation />
          <span>Validations</span>
        </TabsTrigger>
        <TabsTrigger variant='success' className='flex gap-2' value='successes'>
          <Icons.success />
          <span>Successes</span>
        </TabsTrigger>
        <TabsTrigger variant='error' className='flex gap-2' value='errors'>
          <Icons.error />
          <span>Errors</span>
        </TabsTrigger>
      </TabsList>
      <Card className='flex h-0 flex-grow bg-transparent dark:bg-transparent'>
        <CardContent className='w-full overflow-auto'>
          <TabsContent value='validations'>
            <ValidationsTable type={type} validations={validations} />
          </TabsContent>
          <TabsContent value='successes'>
            <ValidationsTable
              type={type}
              validations={validations}
              display='success'
            />
          </TabsContent>
          <TabsContent value='errors'>
            <ValidationsTable
              type={type}
              validations={validations}
              display='error'
            />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};

export default ValidationTabs;
