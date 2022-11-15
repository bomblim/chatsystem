import WebSocket, { WebSocketServer } from 'ws';

let sockets = [];

const websocket = (server) => {

    const wss = new WebSocketServer({ server, path: '/chat'});

    wss.on('connection', (ws, req) => {

        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        ws.ip = ip;
        sockets.push(ws);

        if ( ws.readyState === ws.OPEN ) {

            // init when open
            sockets.filter( v => {
                return ws.protocol === v.protocol;
            }).forEach ( v => {
                var data = { "message" : "one user came in here"};
                sendMessage( v, data, 'send_msg');
            })
        }

    // event listener

        // close
        ws.on('close', (code, reason) => {
            // send to others in same room
            sockets.filter( v => {
                return ws !== v;
            }).forEach( v => {
                if ( v.protocol === ws.protocol ) {
                    var data = { "message" : "one user left here!"};
                    sendMessage( v, data, 'send_msg');
                }
            });
        })

        // error
        ws.on('error', err => {
            console.log(err);
        })

        // message
        ws.on('message', message => {
            msgObj = JSON.parse(message)
            let { type, data } = msgObj;
            switch( type) {
                case 'send_msg':
                    break;
                case 'ping':
                    sendMessage( ws, null, 'pong');
                    break;
                default:
                    break;
            }
        })
    })

    // functions
    function sendMessage( ws, data, type) {
        var strJSON = JSON.stringify( {type, data}) 
        ws.send( strJSON ); 
    }

}


export default websocket;
