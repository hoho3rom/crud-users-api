import { CustomError } from "../errorHandling/CustomError";

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

const pathToMethods = new Map<string, string[]>([
    ['api/users', [Method.GET, Method.POST]],
    ['api/users/{userId}', [Method.PUT, Method.DELETE]],
])

const usersIdRegex = /^api\/users\/([^\/]+)$/; // Matches 'api/users/{userId}'

export const parsePath = (path: string): { path: string, id: number } => {
    const idMatch = path.match(usersIdRegex);
    if (idMatch) {
        return { path: 'api/users/{userId}', id: +idMatch[1] };
    } else if (path === 'api/users') {
        return { path, id: -1 };
    } else {
        throw new CustomError(404, `Path not found: ${path}`);
    }
}