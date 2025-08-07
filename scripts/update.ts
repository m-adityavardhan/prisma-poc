import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

async function main() {
    // Update a user's age by their unique ID.
    const updatedUser = await prisma.user.update({
        where: { email: "test@example.com" },
        data: { age: 26 },
    });
    console.log("Updated user:", updatedUser);

    const updatedUsers = await prisma.user.updateMany({
        where: { age: { lt: 25 } },
        data: { role: "ADMIN" },
    });
    console.log("Number of users updated:", updatedUsers.count);


}

main().catch((e) => { console.error(e); })
    .finally(async () => { await prisma.$disconnect(); })