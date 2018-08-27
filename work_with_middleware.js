const express = require('express');
const app = express();


/** Config app listen */
const { host, port } = {
    host: '127.0.0.1',
    port: 3000
}
app.listen(3000,
    () => console.log(`NodeJS server started: <http://${host}:${port}>`)
);


/** define middleware */
const middlewareAddParamID = (req, res, next) => {
    req.__NodeID__ = Math.random();
    next();
}

const middlewareGetParamID = (req, res, next) => {
    const id = req.__NodeID__;
    if (id < 0.5) next();
    else next(id);
}


/** Action  */
const actionAbout = (req, res) => {
    res.send('action about');
};

const actionAllInOne = (req, res) => {
    res.send('404');
}


/** register middleware */
app.use(middlewareAddParamID);
app.use(middlewareGetParamID);


/** Define route by app */
app.get('/about', actionAbout);
app.use(actionAllInOne);


