import { FC, HTMLAttributes } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Icons } from '@/components/icons';

import { cn } from '@/lib/utils';

import { SchemaType, ValidationType } from '@/schemas/schemas-schema';
import ValidationsTable from './validations-table';

type BaseValidationsTabsProps = {} & HTMLAttributes<HTMLDivElement>;

type SingleSchemaValidationsTabsProps = {
  type: 'single';
  schema: SchemaType;
};

type MultipleSchemasValidationsTabsProps = {
  type: 'multiple';
  schemas: SchemaType[];
};

type ReviewSchemaTabsProps = BaseValidationsTabsProps &
  (SingleSchemaValidationsTabsProps | MultipleSchemasValidationsTabsProps);

const ReviewSchemaTabs: FC<ReviewSchemaTabsProps> = (props) => {
  const { type, className } = props;

  const validations =
    type === 'multiple'
      ? props.schemas.reduce(
          (accumulator, schema) => accumulator.concat(schema.validations),
          [] as ValidationType[]
        )
      : props.schema.validations;

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
      <Card className='flex flex-1 bg-transparent dark:bg-transparent'>
        <CardContent className='flex-1'>
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

export default ReviewSchemaTabs;