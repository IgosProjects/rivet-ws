/*
    This file is licensed under the MIT license, the terms must be followed!
    Copyright(c) 2026 EyeDev
*/

import { WebSocketServer } from 'ws';
import type { RivetPlugin } from '@igosprojects/rivet';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';

export const WSPlugin: RivetPlugin = {
    name: 'logging',
    version: '1.0.0',
    install: function (app: any) {
        console.log('Started WS plugin!');

        const WSRoutes = new Map<string, (ws: any, req: IncomingMessage) => void>();

        // Add WS function to app
        app.ws = (path: string, handler: (ws: any, req: IncomingMessage) => void) => {
            WSRoutes.set(path, handler);
            return app;
        };

        // Start WS server(no port, handles HTTP upgrades)
        const wss = new WebSocketServer({ noServer: true });

        // Hook into server creation
        app.OnServerCreate((server: any) => {
            server.on('upgrade', (req: IncomingMessage, socket: Duplex, head: Buffer) => {
                const url = req.url?.split('?')[0] || '/';
                const handler = WSRoutes.get(url);

                if (handler) {
                    wss.handleUpgrade(req, socket, head, (ws) => {
                        handler(ws, req);
                    });
                } else {
                    socket.destroy();
                }
            });
        });
    },
};
