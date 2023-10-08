import { NextRequest, NextResponse } from 'next/server';

import { ZodError } from 'zod';

import { createSchema } from '@/lib/create-schema';
import { prisma } from '@/lib/db';
import { pusherServer } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';

import { FieldType } from '@/schemas/fields-schemas';

type ParamsType = {
  params: { id: string };
};

export const POST = async (req: NextRequest, params: ParamsType) => {
  const schemaId = params.params.id;

  const apiKey = req.headers.get('authorization')?.trim();

  let data;

  try {
    data = await req.json();
  } catch (error) {
    return NextResponse.json({ message: 'Invalid data.' }, { status: 400 });
  }

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

  if (!schema) {
    return NextResponse.json(
      { message: 'No such schema found.' },
      { status: 400 }
    );
  }

  const runtimeSchema = await createSchema(schema?.fields as FieldType[]);

  const result = await runtimeSchema.safeParseAsync(data);

  const validation = await prisma.validation.create({
    data: {
      input: data,
      success: result.success,
      schemaId: schemaId,
    },
    include: {
      schema: {
        select: {
          name: true,
        },
      },
    },
  });

  pusherServer.trigger(
    toPusherKey(`user:${schema?.userId}:update_validations`),
    'update_validations',
    { ...validation }
  );

  if (!result.success) {
    const validationErrors: ZodError = result.error;
    return NextResponse.json(
      { issues: validationErrors.issues },
      { status: 412 }
    );
  }

  return NextResponse.json({ message: 'Success' }, { status: 200 });
};
