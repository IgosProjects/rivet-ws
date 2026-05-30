# rivet-ws

rivet-ws is a plugin that implements WebSocket support for the Rivet library.

# Usage

To use the WS plugin you first need to initilize it by callling ```app.use```, and then you can register handlers on app.ws.
```app.ws``` works the same way as ```app.get```, you can register handlers. Just like in this example:
```ts
import { Rivet } from "@igosprojects/rivet";
import { WSPlugin } from "@igosprojects/rivet-ws"

const app = new Rivet;

app.use(WSPlugin);

// /api will be where websocket is hosted 
app.ws("/api", (req, res) => {
    // This code runs when a client is connected
    console.log("Client has been connected!");

    // This code runs when "message" is recived
    ws.on('message', (data) => {
        const message = data.toString();
        console.log(`Received: ${message}`); // Print the recived
    });

    // This code runs when the client disconnects and the socket closes
    ws.on('close', () => {
        console.log('Client disconnected');
    });
})

app.get("/", (req, res) => {
    res.send("");
})

app.start(8080, () => {
    console.log("Started server! Go to localhost:8080");
})
```
This library is very simple, and is not very complicated! It was made in like only a few hours lol