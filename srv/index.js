import express from 'express';

import router from './router/router.js';
import websocket from './websocket.js';
import database from './database/dbconnection.js';
// TEST


/*
var res = await database.set("chat-messages", {"type":"data"});
var results = await database.get("chat-messages");
var findings = await database.getbyid("chat-messages", 'mYtDpaFsocKSLiDe5zeo');
console.log('res:', res.id, '\nresults:', results, '\nfindings:', findings)

var conditions = [ ["type","==","data"], ["name","==","dennis"] ]
var cons = await database.getbycondition("chat-messages", conditions);
console.log(cons)
//const {config} = require('./config');
//console.log(config.database);
*/

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.json());

app.use('/', router);

const server = app.listen(app.get('port'), () => {
    console.log( 'web server is open in ', app.get('port'))
});

websocket(server);