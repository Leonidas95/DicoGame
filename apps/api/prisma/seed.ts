import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.language.upsert({
    create: { iso: 'US', name: 'English' },
    where: { iso: 'US' },
    update: {},
  });

  await prisma.language.upsert({
    create: { iso: 'FR', name: 'Français' },
    where: { iso: 'FR' },
    update: {},
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
