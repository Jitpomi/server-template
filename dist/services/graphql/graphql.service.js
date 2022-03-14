import { Graphql } from './graphql.class';
import hooks from './graphql.hooks';
// import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { schema } from '../../nexus/schema';
export default async function (app) {
    try {
        const httpServer = app.get('server');
        // const plugins =  [ApolloServerPluginDrainHttpServer({ httpServer })];
        const options = {
            schema,
            // plugins,
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
