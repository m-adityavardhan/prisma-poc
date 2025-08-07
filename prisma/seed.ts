import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

async function main() {
    // Create users with preferences and posts
    const user1 = await prisma.user.create({
        data: {
            email: 'alice@example.com',
            name: 'Alice',
            age: 30,
            preferences: {
                create: {
                    theme: 'dark',
                },
            },

        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: 'bob@example.com',
            name: 'Bob',
            age: 25,
            preferences: {
                create: {
                    theme: 'light',
                },
            },
        },
    });

    console.log({ user1, user2 });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });