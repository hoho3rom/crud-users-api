# crud-users-api

run the following commands:
nvm use 22.14           // or the later versions of node
npm i                   // to install node-modules

Select appropriate PORT for you in .env, default would be 3000

npm run start:dev       // run server locally

There is a 'nodejs_crud_users.postman_collection.json' file with crud api for http://localhost:3000/api/users

You may find assignments using link below, I skipped 7 and 8
https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md

Duplicated content from the link above without requirements 7 and 8:

## Description

Your task is to implement simple CRUD API using in-memory database underneath.

## Technical requirements

- Task can be implemented on Javascript or Typescript
- Only `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `eslint` and its plugins, `webpack-cli`, `webpack` and its plugins and loaders, `prettier`, `uuid`, `@types/*` as well as libraries used for testing are allowed
- Use 22.x.x version (22.14.0 or upper) of Node.js
- Prefer asynchronous API whenever possible

## Implementation details

1. Implemented endpoint `api/users`:
    - **GET** `api/users` is used to get all persons
        - Server should answer with `status code` **200** and all users records
    - **GET** `api/users/{userId}` 
        - Server should answer with `status code` **200** and record with `id === userId` if it exists
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **POST** `api/users` is used to create record about new user and store it in database
        - Server should answer with `status code` **201** and newly created record
        - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    - **PUT** `api/users/{userId}` is used to update existing user
        - Server should answer with` status code` **200** and updated record
        - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **DELETE** `api/users/{userId}` is used to delete existing user from database
        - Server should answer with `status code` **204** if the record is found and deleted
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
2. Users are stored as `objects` that have following properties:
    - `id` — unique identifier (`string`, `uuid`) generated on server side
    - `username` — user's name (`string`, **required**)
    - `age` — user's age (`number`, **required**)
    - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
3. Requests to non-existing endpoints (e.g. `some-non/existing/resource`) should be handled (server should answer with `status code` **404** and corresponding human-friendly message)
4. Errors on the server side that occur during the processing of a request should be handled and processed correctly (server should answer with `status code` **500** and corresponding human-friendly message)
5. Value of `port` on which application is running should be stored in `.env` file
6. There should be 2 modes of running application (**development** and **production**):
    - The application is run in development mode using `nodemon` or `ts-node-dev` (there is a `npm` script `start:dev`)
    - The application is run in production mode (there is a `npm` script `start:prod` that starts the build process and then runs the bundled file)
