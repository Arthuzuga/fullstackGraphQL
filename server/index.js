const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://tavares:joao.1234@ds151463.mlab.com:51463/gql-learning');
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

//middleware
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

//listen server port
app.listen(4000, () => {
    console.log('Server is ALIVE');
});