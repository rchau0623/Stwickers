const express = require('express');
const app = express();

// This is needed so the client side can make requests.
const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({extended: false}));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Creating the routes for the api.
const inventoryRoutes = require('./api/routes/inventoryRoutes');
app.use('/api', inventoryRoutes);

const path = require('path');
app.use(express.static(path.resolve(__dirname, 'public')));

const portNum = process.env.PORT || 8080;
app.listen(portNum);
console.log('listening on', portNum);
