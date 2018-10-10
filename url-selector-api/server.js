const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 3001,
    routes = require('./app/routes');

require('dotenv').config();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access-token');
    next();
});

// Parse request body to receive ajax data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(routes);

app.listen(port);

module.exports = app;