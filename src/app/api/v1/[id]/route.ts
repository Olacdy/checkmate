import { NextRequest, NextResponse } from 'next/server';

import { ZodError } from 'zod';

import { createSchema } from '@/lib/create-schema';
import { prisma } from '@/lib/db';

import { FieldType } from '@/schemas/fields-schemas';

type ParamsType = {
  params: { id: string };
};

export const POST = async (req: NextRequest, params: ParamsType) => {
  const schemaId = params.params.id;

  const apiKey = req.headers.get('authorization')?.trim();

  const data = await req.json();

  if (!apiKey) {
    return NextResponse.json(
      { message: "API key haven't been provided." },
      { status: 401 }
    );
  }

  const validApiKey = await prisma.apiKey.findFirst({
    where: {
      key: apiKey,
      enabled: true,
    },
  });

  if (!validApiKey) {
    return NextResponse.json({ message: 'Invalid API key.' }, { status: 401 });
  }

  const schema = await prisma.schema.findFirst({
    where: {
      id: schemaId,
    },
  });

  const runtimeSchema = await createSchema(schema?.fields as FieldType[]);

  const result = await runtimeSchema.safeParseAsync(data);

  await prisma.validation.create({
    data: {
      input: data,
      success: result.success,
      schemaId: schemaId,
    },
  });

  if (!result.success) {
    const validationErrors: ZodError = result.error;
    return NextResponse.json(
      { issues: validationErrors.issues },
      { status: 412 }
    );
  }

  return NextResponse.json({ message: 'Success' }, { status: 200 });
};
