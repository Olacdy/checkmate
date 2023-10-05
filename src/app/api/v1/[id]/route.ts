import { NextRequest, NextResponse } from 'next/server';

import { createSchema } from '@/lib/create-schema';
import { prisma } from '@/lib/db';
import { getServerAuthSession } from '@/lib/nextauth';

import { FieldType } from '@/schemas/fields-schemas';
import { ZodError } from 'zod';

type ParamsType = {
  params: { id: string };
};

export const POST = async (req: NextRequest, params: ParamsType) => {
  const session = await getServerAuthSession();
  const schemaId = params.params.id;

  const data = await req.json();

  // if (!session) {
  //   return NextResponse.json(
  //     { message: 'Unauthorized. Please, provide auth credentials.' },
  //     { status: 401 }
  //   );
  // }

  const schema = await prisma.schema.findFirst({
    where: {
      id: schemaId,
    },
  });

  // if (schema?.userId !== session.user.id) {
  //   return NextResponse.json(
  //     { message: 'Forbidden. You do not have access to this schema.' },
  //     { status: 403 }
  //   );
  // }

  const runtimeSchema = await createSchema(schema?.fields as FieldType[]);

  console.log(runtimeSchema.shape);

  const result = await runtimeSchema.safeParseAsync(data);

  console.log(result);

  if (!result.success) {
    const validationErrors: ZodError = result.error;
    return NextResponse.json(
      { issues: validationErrors.issues },
      { status: 412 }
    );
  }

  return NextResponse.json({ message: 'Success' }, { status: 200 });
};
