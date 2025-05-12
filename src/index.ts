import http, { type IncomingMessage, type ServerResponse } from 'http';
import { handle } from './service.js';
import { handleError } from './errorHandling/index.js';
import 'dotenv/config';

const PORT = process.env.PORT || 4444;

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    response.setHeader('Content-Type', 'application/json');
    try{
        handle(request, response);
    } catch (error) {
        handleError(error as Error, response);
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});