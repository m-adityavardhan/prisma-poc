import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

async function main() {
    // Finds a unique user by composite key (name and age).
    const user = await prisma.user.findUnique({
        where: {
            name_age: {
                name: "me",
                age: 1,
            }  
        }
    })
    console.log(" user:", user);

    // Finds the first user with age 25.
    const fuser = await prisma.user.findFirst({
        where: {
            age: 25 
        }
    })
    console.log(" age_user:", fuser);

    // Finds all users with age 25.
    const alluser = await prisma.user.findMany({
        where: {
            age: 25 
        }
    })
    console.log(" all_age_user:", alluser);

    // Finds all users with age 25 with distint name.
    const allNameuser = await prisma.user.findMany({
        where: {
            age: 25 
        },
        distinct: ['name'],
        orderBy: { name: 'asc' },
        skip: 2,
        take: 3
    })
    console.log(" filtering:", allNameuser);
}

main().catch((e) => { console.error(e); })
    .finally(async () => { await prisma.$disconnect(); })