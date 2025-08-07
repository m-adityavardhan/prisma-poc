import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

async function main() {
    // Delete a single user by unique identifier (e.g., id)
    const deletedUser = await prisma.user.delete({
        where: { email: "test@example.com" },
    });
    console.log('Deleted user:', deletedUser);

    // Delete many users matching a condition (e.g., all users with isActive = false)
    const deletedManyByAge = await prisma.user.deleteMany({
        where: { age: 25 },
    });
    console.log('Return value from deleteMany (age = 25):', deletedManyByAge);

    // Delete all users (no filter)
    const deletedAll = await prisma.user.deleteMany({});
    console.log('Return value from deleteMany (all users):', deletedAll);
}

main().catch((e) => { console.error(e); })
    .finally(async () => { await prisma.$disconnect(); })