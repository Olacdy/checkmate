import { NextRequest, NextResponse } from 'next/server';

import { ZodError } from 'zod';

import { createSchema } from '@/lib/create-schema';
import { prisma } from '@/lib/db';

import { FieldType } from '@/schemas/fields-schemas';

export const POST = async (req: NextRequest) => {
  console.log('here');

  let data;

  try {
    data = await req.json();
  } catch (error) {
    return NextResponse.json({ message: 'Invalid data.' }, { status: 400 });
  }

  const schema = await prisma.schema.findFirst({
    where: {
      id: '1',
    },
  });

  const runtimeSchema = await createSchema(schema?.fields as FieldType[]);

  const result = await runtimeSchema.safeParseAsync(data);

  if (!result.success) {
    const validationErrors: ZodError = result.error;
    return NextResponse.json(
      { issues: validationErrors.issues },
      { status: 412 }
    );
  }

  return NextResponse.json({ message: 'Success' }, { status: 200 });
};
