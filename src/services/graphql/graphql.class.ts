import { ApolloServer, Config, ExpressContext } from 'apollo-server-express';

export class Graphql extends ApolloServer {

  constructor(options: Config<ExpressContext>) {
    super(options);
  }

}
