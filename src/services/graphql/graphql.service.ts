// Initializes the `graphql` service on path `/graphql`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Graphql } from './graphql.class';
import hooks from './graphql.hooks';

import { schema } from '../../nexus/schema';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'graphql': Graphql & ServiceAddons<any>;
  }
}

export default async function (app: Application): Promise<void> {
  try{
    const options = {
      schema,
    };

    const apolloServer = new Graphql(options);

    await apolloServer.start();
    apolloServer.applyMiddleware({ app});
    // Initialize our service with any options it requires
    app.use('/graphql', apolloServer);

    // Get our initialized service so that we can register hooks
    const service = app.service('graphql');

    service.hooks(hooks);

  }catch(error:any){
    throw Error(error);
  }
}
