const express = require('express');
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');
const contact = require('./app/routes/contact.route'); // Imports routes for the products
const app = express();
require('dotenv').config();

app.use(express.static('public'));
// parse requests of content-type - application/json
app.use(bodyparser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: true}));
app.use(fileUpload());

app.use('/api', contact);
let port = process.env.PORT || 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});