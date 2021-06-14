# Awesome K-Pop GraphQL API | Author: Sara Strasner

This API is the backbone of [K-Pop Band Generator](https://k-pop-band-generator.pages.dev/). It consists of:

- Mongoose as the Object Data Modeling library
- MongoDB as the database
- GraphQL as the query language

## Data

Each K-Pop idol has name, gender, group, specialty (as an array of strings), photo, bio, and link. All are required.

## Usage

Root URL: https://k-pop-api-v2.herokuapp.com/graphql

```
Root Query:

{
  performers {
    name
    gender
    group
    specialty
    photo
    bio
    link
  }
}
// This query returns all database fields for every K-Pop star in the database.
```

```
Custom Query:

{
  performersCustom(limit: 10) {
    name
    gender
    group
  }
}
// returns the name, gender, and group of 10 random K-pop stars
// This query can be customized for one or more of the following queries: limit, gender, or group
```

```
Root Mutation:

mutation {
  createPerformer(performerInput:
  {
    name: "Bob",
     group: "Test",
     specialty: ["singer", "rapper"],
     photo: "photo URL",
     gender: "male",
     bio: "Bio string",
     link: "wikipedia link"
     })
     {
    name
    group
  }
}
// Adds a new idol to the database and returns the name and group of the newly-added idol
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
