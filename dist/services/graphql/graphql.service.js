import { Graphql } from './graphql.class';
import hooks from './graphql.hooks';
import { schema } from '../../nexus/schema';
export default async function (app) {
    try {
        const options = {
            schema,
        };
        const apolloServer = new Graphql(options);
        await apolloServer.start();
        apolloServer.applyMiddleware({ app });
        // Initialize our service with any options it requires
        app.use('/graphql', apolloServer);
        // Get our initialized service so that we can register hooks
        const service = app.service('graphql');
        service.hooks(hooks);
    }
    catch (error) {
        throw Error(error);
    }
}
