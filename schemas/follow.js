import { GraphQLError } from "graphql";

const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    input AddFollow {
        _id: ID
        followingId: ID
        followerId: ID
    }

    type Query {
        follows: [Follow]
        followById(id: ID): Follow
    }

    type Mutation {
        addFollow(addFollow:AddFollow): Follow
    }
`;

const resolvers = {
  Query: {
    follows: () => follows,
    followById: (_, { id }) => {
      if (!id) {
        throw new GraphQLError("No ID provided", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { statusCode: 400 },
          },
        });
      }
      return follows.find((follow) => follow.id === id);
    },
  },
  Mutation: {
    addFollow: (_, { name, username, email, password }) => {
      const newFollow = { id, name, username };
      follows.push(newFollow);
      return newFollow;
    },
  },
};

export { typeDefs, resolvers };