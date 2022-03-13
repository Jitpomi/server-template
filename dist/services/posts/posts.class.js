import { PrismaService } from 'feathers-prisma';
export class Posts extends PrismaService {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(options, app) {
        super(options, app.get('prisma'));
    }
}
