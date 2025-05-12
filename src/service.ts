import url from 'url';
import { parseValidatePath, parseUser, validateId, validateUser } from './utils.js';
import type { IncomingMessage, ServerResponse } from 'http';
import { db } from './db.js';
import { CustomError } from './errorHandling/CustomError.js';
import { Method } from './types.js';

const pathToMethodToApi = new Map<string, Record<string, Function>>();
pathToMethodToApi.set('/api/users', { [Method.GET]: listUsers, [Method.POST]: createUser });
pathToMethodToApi.set('/api/users/{userId}', { [Method.GET]: getUserById, [Method.PUT]: updateUser, [Method.DELETE]: deleteUser });

export const controller = async (request: IncomingMessage, response: ServerResponse) => {
    const parsedUrl = url.parse(request.url || '', true);
    const method = request.method || '';

    const { path, id } = parseValidatePath(parsedUrl.pathname || '');
    validateId(id);

    const api = pathToMethodToApi.get(path)?.[method];
    if (!api) {
        throw new CustomError(404, `Method ${method} not allowed on path ${path}`);
    }

    id != null
        ? await api(id, request, response)
        : await api(request, response);
}

function listUsers(request: IncomingMessage, response: ServerResponse) {
    const users = db.getUsers();

    response.writeHead(200);
    response.end(JSON.stringify(users));
}

function getUserById(id: string, request: IncomingMessage, response: ServerResponse) {
    const user = db.getUserById(id);

    response.writeHead(200);
    response.end(JSON.stringify(user));
}

async function createUser(request: IncomingMessage, response: ServerResponse) {
    const newUser = await parseUser(request);
    const createdUser = db.createUser(validateUser(newUser));

    response.writeHead(201);
    response.end(JSON.stringify(createdUser));
}

async function updateUser(id: string, request: IncomingMessage, response: ServerResponse) {
    const newUser = await parseUser(request);
    const updatedUser = db.updateUser(id, validateUser(newUser));

    response.writeHead(200);
    response.end(JSON.stringify(updatedUser));
}

function deleteUser(id: string, request: IncomingMessage, response: ServerResponse) {
    db.deleteUser(id);

    response.writeHead(204);
    response.end();
}
