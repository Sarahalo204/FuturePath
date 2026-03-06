const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['query', 'error'] });

async function main() {
    try {
        const count = await prisma.user.count();
        console.log('Connection successful. User count:', count);
    } catch (e) {
        console.error('Connection failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
