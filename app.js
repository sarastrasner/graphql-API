const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Performer = require('./models/performer');
const options = { useNewUrlParser: true, useUnifiedTopology: true };
require('dotenv').config();
const app = express();

let port = process.env.PORT || 3001;

app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`

    type Performer {
      _id: ID!
      name: String!
      group: String!
      specialty: [String!]!
      photo: String!
      gender: String!
      bio: String!
    }

    input PerformerInput {
      name: String!
      group: String!
      specialty: [String!]!
      photo: String!
      gender: String!
      bio: String!
    }

    type RootQuery {
      performers: [Performer!]!
    }

    type RootMutation {
      createPerformer(performerInput: PerformerInput): Performer
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
    rootValue: {
      performers: () => {
        return Performer.find()
          .then(performers => {
            return performers.map(performer => {
              return { ...performer._doc };
            });
          })
          .catch(error => {
            throw error;
          });
      },
      createPerformer: args => {
        const performer = new Performer({
          name: args.performerInput.name,
          group: args.performerInput.group,
          specialty: args.performerInput.specialty,
          photo: args.performerInput.photo,
          gender: args.performerInput.gender,
          bio: args.performerInput.bio,
        });
        return performer
          .save()
          .then(results => {
            console.log('Saved to mongo!', results);
            return { ...results._doc };
          })
          .catch(error => {
            console.log(error);
            throw error;
          });
      },
    },
    graphiql: true,
  })
);


mongoose
  .connect(process.env.MONGOOSE_URI, options)
  .then(() => {
    console.log('Mongo connected!');
    app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
  })
  .catch(error => {
    console.error(error);
  });
