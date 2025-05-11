import http from 'http';
import url from 'url';
import { handle } from './web/usersController';

const PORT = 3000;

const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    handle(request, response);
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});