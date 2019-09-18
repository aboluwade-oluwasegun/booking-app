const mongoose = require("mongoose");
const graphqlHttp = require("express-graphql");
const express = require("express");

const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(express.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
  })
);

mongoose
  .connect("mongodb://localhost/booking-app", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() =>
    app.listen(3000, () => {
      console.log("Connected to the database. Listening on port 3000.");
    })
  )
  .catch(err => {
    console.log(err);
  });
