const express = require('express');
const app = express();
const path = require('path');

const { host, port } = { host: '127.0.0.1', port: 3000 };

app.listen(port, host, () => console.log(`Server started at <http://${host}:${port}>`));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// router controller
const pages = require('./router/pages');
app.get('/', pages.actionHome);
app.get('/about', pages.actionAbout);
app.use(pages.actionError);