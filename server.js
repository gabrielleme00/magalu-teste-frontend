require('dotenv').config();

const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT;

app.use(express.static(__dirname + '/public/'));
app.use(routes);

app.listen(port, () => {
    console.log(`Up and running @ http://localhost:${port}`);
});
