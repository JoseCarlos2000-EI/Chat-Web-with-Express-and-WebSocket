import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  console.log('Status: Connected');
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    const message = String(data).toUpperCase();
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {

          client.send(
            JSON.stringify({
                owner: client ==  ws ? true : false,
                message
            })
            , { binary: isBinary });
        }
    });
  });

  ws.on('close', ()=> {
    console.log('Status: Disconnected');

  });


});

console.log('http://localhost:3000');