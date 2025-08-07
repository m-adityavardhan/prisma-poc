import { PrismaClient } from './generated/prisma';
const prisma = new PrismaClient();

async function main() {
    // Example: Create a new user
    const newUser = await prisma.user.create({
        data: {
            email: "ert@example.com",
            name: "TettUser",
            age: 25,  
            preferences: {
                create: 
                    {
                       theme: "dark",
                    }
            }
        },
        select :{
            id: true,
            name: true,
             preferences: {
                select: {
                    theme: true
                }
            }
        }
    })

    console.log("Created new user:", newUser);
}

main().catch((e) => { console.error(e); })
    .finally(async () => { await prisma.$disconnect(); })