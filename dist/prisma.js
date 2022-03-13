import { PrismaClient } from '@prisma/client';
export default function (app) {
    const connectionString = app.get('postgres');
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: connectionString,
            },
        },
    });
    prisma.$connect();
    app.set('prisma', prisma);
}
