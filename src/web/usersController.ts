import url from 'url';
import { Method, parsePath } from '../utils/path';

const pathToMethodToApi = new Map<string, Record<string, Function>>();
pathToMethodToApi.set('api/users', { [Method.GET]: listUsers, [Method.POST]: createUser });
pathToMethodToApi.set('api/users/{userId}', { [Method.GET]: getUserById, [Method.PUT]: updateUser });


export const handle = async (request, response) => {
    const parsedUrl = url.parse(request.url || '', true);
    const method = request.method;

    const { path, id } = parsePath(parsedUrl.pathname || '');
    const api = pathToMethodToApi.get(path)?.[method];

    id > 0 ? api?.(id, request, response) : api?.(request, response);
}

async function listUsers(request, response) {

}

async function getUserById(id: number, request, response) {

}

async function createUser(request, response) {

}

async function updateUser(id: number, request, response) {

}

async function deleteUser(id: number, request, response) {

}

