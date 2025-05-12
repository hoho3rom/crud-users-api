export type User = {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}
