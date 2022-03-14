
import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello() {
      return 'world';
    },
  },
};


export default makeExecutableSchema({ typeDefs, resolvers });
