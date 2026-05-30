import { Rivet } from '@igosprojects/rivet';
import { WSPlugin } from '../src/plugin';

const app = new Rivet();

app.use(WSPlugin);

// Just use 'any' for simplicity in the example
app.ws('/chat', (ws: any, req: any) => {
    console.log('Client connected!');
    
    ws.on('message', (data: Buffer) => {
        const msg = data.toString();
        ws.send(`Echo: ${msg}`);
    });
});

app.static("/", "./");

app.start(3000);