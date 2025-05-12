import type { ServerResponse } from "http";
import { CustomError } from "./CustomError.js";

export const handleError = (error: Error, response: ServerResponse) => {
    const code = error instanceof CustomError ? error.code : 500;
    const message = error instanceof CustomError ? error.message : "Oops, something went wrong...";

    response.writeHead(code);
    response.end(JSON.stringify({ error: message }));
}
