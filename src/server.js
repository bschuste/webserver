// Let's make the code cleaner by using strict mode
// See this information about strict mode in the ES5 specification 
//  http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf on page #235.
'use strict';

// Load path package let's us define a path to the site web pages
const path = require('path');
// Load body-parser package to parse requests
// Parse incoming request bodies in a middleware before the middleware handlers,
//  available under the req.body property.
const bodyParser = require('body-parser');
// Load mongoose package to access the mongoDb database
const mongoose = require('mongoose');
// Load the web application framework package
const express = require('express');
// Load configuration file to help keeping configuration information 
//  away from the code.
const config = require('./config');
// Load the routes definition of application end points (URIs) 
const router = require('./routes');

// Connect to MongoDB and create/use database as configured
mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`, 
  {
    useMongoClient: true,
    /* other options */
  });

// Import all models
require('./models/workshop.model.js');

const app = express();
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.use(bodyParser.json());

// Forward to router for any REST calls below /api
app.use('/api', router);

// Start listening on configured port
app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});
