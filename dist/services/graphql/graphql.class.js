import { ApolloServer } from 'apollo-server-express';
export class Graphql extends ApolloServer {
    constructor(options) {
        super(options);
    }
}
