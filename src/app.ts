import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
   console.log('<--------------- JK App --------------->');
   console.log('client connection');
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    const payload = {
      type: 'custom-message',
      payload: data?.toString().toUpperCase(),
    };
    // ws.send(JSON.stringify(payload));

    wss.clients.forEach(function each(client) {

      // * all
      // if ( client.readyState === WebSocket.OPEN ) {
      //   client.send( JSON.stringify(payload), { binary: false } );
      // }
      if ( client !== ws &&  client.readyState === WebSocket.OPEN ) {
        client.send( JSON.stringify(payload), { binary: false } );
      }
    });
  });

  ws.send('hello from server');

  ws.on( 'close', () => {
    console.log('client disconnected');
  });
});