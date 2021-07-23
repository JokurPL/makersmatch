const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUsers = async () => {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@fullstak.pl' },
    update: {
      updatedAt: new Date()
    },
    create: {
      email: `alice@fullstak.pl`,
      name: 'Alice',
      skill: 'Fullstack Developer',
      timezone: '+02:00'
    }
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@fullstak.pl' },
    update: {
      updatedAt: new Date()
    },
    create: {
      email: 'bob@fullstak.pl',
      name: 'Bob',
      skill: 'UI Designer',
      timezone: '+02:00'
    }
  });

  const anna = await prisma.user.upsert({
    where: { email: 'anna@fullstak.pl' },
    update: {
      updatedAt: new Date()
    },
    create: {
      email: 'anna@fullstak.pl',
      name: 'Anna',
      skill: 'Android Developer',
      timezone: '+02:00'
    }
  });

  return [alice, bob, anna];
};

const createFilters = async () => {
  const alice = await prisma.user.findUnique({
    where: { email: 'alice@fullstak.pl' },
    include: {
      filter: true
    }
  });

  if (!alice.filter) {
    await prisma.filter.create({
      data: {
        user: {
          connect: {
            id: alice.id
          }
        },
        skill: 'UI Developer',
        timezone: '+02:00'
      }
    });
  }
};

const createConservation = async (users) => {
  await prisma.conversation.create({
    data: {
      users: {
        create: [
          {
            user: {
              connect: {
                id: users[0].id
              }
            }
          },
          {
            user: {
              connect: {
                id: users[1].id
              }
            }
          }
        ]
      },
      messages: {
        create: [
          {
            content: 'Hi, how are you?',
            user: {
              connect: {
                id: users[0].id
              }
            }
          },
          {
            content: 'Hi, im ok',
            user: {
              connect: {
                id: users[1].id
              }
            }
          }
        ]
      }
    }
  });
};

async function main() {
  const [alice, bob, anna] = await createUsers();
  await createFilters();
  await createConservation([alice, bob]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
