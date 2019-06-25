const express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors');
// mongoose = require('mongoose'),
// config = require('./DB');
// const knex = require('./helpers/knex');
const user = require('./routes/user');
const members = require('./models/members');
const knex = require("knex")({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "postgres",
        password: "sk@96877",
        database: "Demo"
    }
});
const businessRoute = require('./routes/business.route');
// mongoose.Promise = global.Promise;
// mongoose.connect(config.DB, { useNewUrlParser: true }).then(
//     () => { console.log('Database is connected') },
//     err => { console.log('Can not connect to the database' + err) }
// );

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    res.locals.user = req.user || null;
    //intercepts OPTIONS method
    if ("OPTIONS" === req.method) {
        //respond with 200
        res.sendStatus(200);
    } else {
        //move on
        next();
    }
});

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/business', businessRoute);
app.use(user);
app.use(members);
const port = process.env.PORT || 4000;

const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});
