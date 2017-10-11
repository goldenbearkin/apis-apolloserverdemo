import { makeExecutableSchema } from 'graphql-tools';
import * as lodash from 'lodash';

const rootSchema = [`
  type Query {
    user: User
  }

  type User {
    firstName: String
    lastName: String
  }

  schema {
    query: Query
  }
`];

const rootResolvers = {
  Query: {
    user() {
      return { firstName: 'Jason', lastName: 'Hui' };
    }
  },
};

export const executableSchema = makeExecutableSchema({
  typeDefs: [
    ...rootSchema,
  ],
  resolvers: lodash.merge(
    rootResolvers,
  ),
});
