const { makeExecutableSchema } = require('graphql-tools');
const { postQueries } = require('../queries');
const { postMutations } = require('../mutations');

const typeDefs = `
type Post {
  id: Int!
  title: String
  body: String
}

type Query {
  posts: [Post]
  post(id: ID!): Post
}

type Mutation {
  createPost(title: String!, body: String): Post
  deletePost(id: ID!): Boolean,
}
`;
const resolvers = {
  Query: {
    posts: async () => postQueries.getAll(),
    post: async (obj, args, context, info) => postQueries.getById(args.id)
  },
  Mutation: {
    createPost: async (obj, args, context, info) => postMutations.create(args),
    deletePost: async (obj, args, context, info) => postMutations.deleteById(args.id)
  }
}

module.exports = makeExecutableSchema({
  typeDefs, resolvers
});
