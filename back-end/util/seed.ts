// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.task.deleteMany();
    await prisma.status.deleteMany();
    await prisma.board.deleteMany();
    await prisma.group.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();

    // Create users
    const userMees = await prisma.user.create({
        data: {
            username: 'meesv',
            hashedPassword: await bcrypt.hash('mees123', 10),
        },
    });

    const userLars = await prisma.user.create({
        data: {
            username: 'larsf',
            hashedPassword: await bcrypt.hash('lars123', 10),
        },
    });

    const userJeroen = await prisma.user.create({
        data: {
            username: 'jeroenr',
            hashedPassword: await bcrypt.hash('jeroen123', 10),
        },
    });

    const userJohan = await prisma.user.create({
        data: {
            username: 'johanp',
            hashedPassword: await bcrypt.hash('johan123', 10),
        },
    });

    const userElke = await prisma.user.create({
        data: {
            username: 'elkes',
            hashedPassword: await bcrypt.hash('elke123', 10),
        },
    });

    // Create profiles
    const profileMees = await prisma.profile.create({
        data: {
            email: 'mees@gmail.com',
            firstName: 'Mees',
            lastName: 'Verbeeck',
            bio: 'I study software development.',
            user: {
                connect: { id: userMees.id },
            },
        },
    });

    const profileLars = await prisma.profile.create({
        data: {
            email: 'lars@gmail.com',
            firstName: 'Lars',
            lastName: 'François',
            bio: 'I study Infrastructure.',
            user: {
                connect: { id: userLars.id },
            },
        },
    });

    // Create groups
    const group1 = await prisma.group.create({
        data: {
            name: 'Group 1',
            description: 'This is group 1.',
            leader: { connect: { id: userMees.id } },
            users: {
                connect: [{ id: userLars.id }, { id: userJeroen.id }, { id: userJohan.id }, { id: userElke.id }],
            },
        },
    });

    const group2 = await prisma.group.create({
        data: {
            name: 'Group 2',
            description: 'This is group 2.',
            leader: { connect: { id: userLars.id } },
            users: {
                connect: [{ id: userMees.id }],
            },
        },
    });

    // Create boards
    const group1board1 = await prisma.board.create({
        data: {
            name: 'Board 1',
            description: 'This is board 1.',
            group: {
                connect: { id: group1.id },
            },
        },
    });

    const group1board2 = await prisma.board.create({
        data: {
            name: 'Board 2',
            description: 'This is board 2.',
            group: {
                connect: { id: group1.id },
            },
        },
    });

    const group2board1 = await prisma.board.create({
        data: {
            name: 'Board 1',
            description: 'This is board 1.',
            group: {
                connect: { id: group2.id },
            },
        },
    });

    // Create statuses
    const group1board1status1 = await prisma.status.create({
        data: {
            name: 'Status 1',
            board: {
                connect: { id: group1board1.id },
            },
        },
    });

    const group1board1status2 = await prisma.status.create({
        data: {
            name: 'Status 2',
            board: {
                connect: { id: group1board1.id },
            },
        },
    });

    const group1board1status3 = await prisma.status.create({
        data: {
            name: 'Status 3',
            board: {
                connect: { id: group1board1.id },
            },
        },
    });

    const group1board1status4 = await prisma.status.create({
        data: {
            name: 'Status 4',
            board: {
                connect: { id: group1board1.id },
            },
        },
    });

    const group1board2status1 = await prisma.status.create({
        data: {
            name: 'Status 1',
            board: {
                connect: { id: group1board2.id },
            },
        },
    });

    const group1board2status2 = await prisma.status.create({
        data: {
            name: 'Status 2',
            board: {
                connect: { id: group1board2.id },
            },
        },
    });
    
    const group1board2status3 = await prisma.status.create({
        data: {
            name: 'Status 3',
            board: {
                connect: { id: group1board2.id },
            },
        },
    });

    const group2board1status1 = await prisma.status.create({
        data: {
            name: 'Status 1',
            board: {
                connect: { id: group2board1.id },
            },
        },
    });

    const group2board1status2 = await prisma.status.create({
        data: {
            name: 'Status 2',
            board: {
                connect: { id: group2board1.id },
            },
        },
    });

    // Create tasks
    const group1board1status1task1 = await prisma.task.create({
        data: {
            name: 'Task 1',
            description: 'This is task 1.',
            status: {
                connect: { id: group1board1status1.id },
            },
        },
    });

    const group1board1status1task2 = await prisma.task.create({
        data: {
            name: 'Task 2',
            description: 'This is task 2.',
            status: {
                connect: { id: group1board1status1.id },
            },
        },
    });

    const group1board1status2task1 = await prisma.task.create({
        data: {
            name: 'Task 1',
            description: 'This is task 1.',
            status: {
                connect: { id: group1board1status2.id },
            },
        },
    });

    const group1board1status2task2 = await prisma.task.create({
        data: {
            name: 'Task 2',
            description: 'This is task 2.',
            status: {
                connect: { id: group1board1status2.id },
            },
        },
    });

    const group1board1status3task1 = await prisma.task.create({
        data: {
            name: 'Task 1',
            description: 'This is task 1.',
            status: {
                connect: { id: group1board1status3.id },
            },
        },
    });

    const group1board1status3task2 = await prisma.task.create({
        data: {
            name: 'Task 2',
            description: 'This is task 2.',
            status: {
                connect: { id: group1board1status3.id },
            },
        },
    });

    const group1board1status4task1 = await prisma.task.create({
        data: {
            name: 'Task 1',
            description: 'This is task 1.',
            status: {
                connect: { id: group1board1status4.id },
            },
        },
    });

    const group1board1status4task2 = await prisma.task.create({
        data: {
            name: 'Task 2',
            description: 'This is task 2.',
            status: {
                connect: { id: group1board1status4.id },
            },
        },
    });

    const group1board2status1task1 = await prisma.task.create({
        data: {
            name: 'Task 1',
            description: 'This is task 1.',
            status: {
                connect: { id: group1board2status1.id },
            },
        },
    });

    const group1board2status1task2 = await prisma.task.create({
        data: {
            name: 'Task 2',
            description: 'This is task 2.',
            status: {
                connect: { id: group1board2status1.id },
            },
        },
    });

    const group1board2status2task1 = await prisma.task.create({
        data: {
            name: 'Task 1',
            description: 'This is task 1.',
            status: {
                connect: { id: group1board2status2.id },
            },
        },
    });

    const group1board2status2task2 = await prisma.task.create({
        data: {
            name: 'Task 2',
            description: 'This is task 2.',
            status: {
                connect: { id: group1board2status2.id },
            },
        },
    });

    const group1board2status3task1 = await prisma.task.create({
        data: {
            name: 'Task 1',
            description: 'This is task 1.',
            status: {
                connect: { id: group1board2status3.id },
            },
        },
    });

    const group1board2status3task2 = await prisma.task.create({
        data: {
            name: 'Task 2',
            description: 'This is task 2.',
            status: {
                connect: { id: group1board2status3.id },
            },
        },
    });

    const group2board1status1task1 = await prisma.task.create({
        data: {
            name: 'Task 1',
            description: 'This is task 1.',
            status: {
                connect: { id: group2board1status1.id },
            },
        },
    });

    const group2board1status1task2 = await prisma.task.create({
        data: {
            name: 'Task 2',
            description: 'This is task 2.',
            status: {
                connect: { id: group2board1status1.id },
            },
        },
    });

    const group2board1status2task1 = await prisma.task.create({
        data: {
            name: 'Task 1',
            description: 'This is task 1.',
            status: {
                connect: { id: group2board1status2.id },
            },
        },
    });

    const group2board1status2task2 = await prisma.task.create({
        data: {
            name: 'Task 2',
            description: 'This is task 2.',
            status: {
                connect: { id: group2board1status2.id },
            },
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
