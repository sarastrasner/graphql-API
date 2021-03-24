const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
require('dotenv').config();

const app = express();
let port = process.env.PORT || 3001;

app.use(express.json());


app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`

    type RootQuery {
      performers: [String!]!
    }

    type RootMutation {
      createPerformer(name: String): String
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
    rootValue: {
      performers: () => {
        return ['Lisa', 'Rose', 'Jisoo', 'Jennie'];
      },
      createPerformer: args => {
        const performerName = args.name;
        return performerName;
      },
    },
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
