const express = require('express');
const bodyParser = require('body-parser');
const contact = require('./routes/contact.route'); // Imports routes for the products
const app = express();

const product_controller = require('./controllers/contact.controller');

app.use('/api', contact);
let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

exports.vcfParse = product_controller.vcfParse;