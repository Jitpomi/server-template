import { Posts } from './posts.class';
import hooks from './posts.hooks';
export default function (app) {
    const options = {
        model: 'posts',
        client: app.get('prisma'),
        paginate: app.get('paginate')
    };
    // Initialize our service with any options it requires
    app.use('/posts', new Posts(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('posts');
    service.hooks(hooks);
}
