const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../server/schema/schema.js');
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');

const app = express();

// const { Pool, Client } = require('pg');
// const pool = new Pool({
//     user: "joaotavares",
//     host: "localhost",
//     database: "postgres",
//     password: 'senhaaleatoria',
//     port: 5432,
//     max: 10
// });

//allow cross-origin requests
app.use(cors());

mongoose.connect('mongodb://tavares:joao.1234@ds151463.mlab.com:51463/gql-learning');
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

// app.get('/', (req, res) => res.send('API working at PORT:4000/graphql'))
app.get('/', (req, res) => res.sendFile(path.join(__dirname + `/welcomePage.html`)))

//middleware
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

//listen server port
app.listen(4000, () => {
    console.log('Server is ALIVE');
});