import { validate } from "uuid";
import { CustomError } from "./errorHandling/CustomError.js";
import type { IncomingMessage } from "http";
import type { User } from "./types.js";

const usersIdRegex = /^\/api\/users\/([^\/]+)$/;; // Matches 'api/users/{userId}'

export const parseValidatePath = (path: string): { path: string, id: string | null } => {
    const idMatch = path.match(usersIdRegex);
    if (idMatch) {
        const id = idMatch[1];
        return { path: '/api/users/{userId}', id };
    } else if (path === '/api/users') {
        return { path, id: null };
    } else {
        throw new CustomError(404, `Path not found: ${path}`);
    }
}

export const parseUser =  async (request: IncomingMessage) => {
    return new Promise((resolve, reject) => {
        let body = '';

        request.on('data', chunk => { body += chunk; });

        request.on('error', reject);

        request.on('end', () => {
            try {
                const user = JSON.parse(body);
                resolve(user);
            } catch (error) {
                reject(new CustomError(400, `Invalid JSON provided`));
            }
        });
    });
}

export const validateId = (id: string | null) => {
    const isValidId = id == null || validate(id);
    if (!isValidId) {
        throw new CustomError(404, `Invalid user id: ${id}`);
    }
}

export const validateUser = (user: any): User => {
    const { username, age, hobbies } = user;

    if (!username || !age || !hobbies) {
        throw new CustomError(400, `Missing required field: ${!username ? 'username' : ''} ${!age ? 'age' : ''} ${!hobbies ? 'hobbies' : ''}`.trim());
    }

    if (typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
        throw new CustomError(400, `Invalid field type: ${typeof username !== 'string' ? 'username' : ''} ${typeof age !== 'number' ? 'age' : ''} ${!Array.isArray(hobbies) ? 'hobbies' : ''}`.trim());
    }

    if (hobbies.some(hobby => typeof hobby !== 'string')) {
        throw new CustomError(400, `Invalid hobbies type: ${hobbies.filter(hobby => typeof hobby !== 'string').join(', ')}`);
    }

    return user as User;
}