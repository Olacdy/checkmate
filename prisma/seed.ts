import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultSchema = await prisma.schema.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Default',
      fields: JSON.parse(
        '[{"id":"7a97f2b2-a9f8-4a17-96e5-19db463a2896","name":"FirstName","type":"string","regex":"","isArray":false,"isEmail":false,"maxLength":60,"minLength":2,"isRequired":true},{"id":"896b7a16-0e2c-4f82-a272-81ca0f935711","name":"LastName","type":"string","regex":"","isArray":false,"isEmail":false,"maxLength":60,"minLength":2,"isRequired":true},{"id":"097bebce-ee52-43b0-8da8-2d9dd7f3bd96","max":99,"min":3,"name":"Age","type":"number","isInt":false,"isArray":false,"isRequired":true},{"id":"8390d72f-2fe7-41c3-9547-5844988b9c65","to":"2019-12-30T22:00:00.000Z","from":"1950-01-01T21:00:00.000Z","name":"BirthDate","type":"date","isArray":false,"isRequired":true}]'
      ) as Prisma.InputJsonValue,
    },
  });
  console.log(defaultSchema);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
