import { CustomError } from "./CustomError";

export const handleError = (error: Error, response) => {
    const code = error instanceof CustomError ? error.code : 500;

    response.writeHead(code);
    response.end(JSON.stringify({ error: error.message }));
}
