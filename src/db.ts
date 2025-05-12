import { CustomError } from "./errorHandling/CustomError.js";
import type { User } from "./types.js";

const users: User[] = [];

const UserNotExistError = (id: string) => {
    return new CustomError(404, `User with id '${id}' doesn't exists`);
}

const getUsers = () => {
    return users;
}

const getUserById = (id: string) => {
    const user = users.find(user => user.id === id);
    if (!user) {
        throw UserNotExistError(id);
    }

    return user;
}

const createUser = (user: User) => {
    const id = crypto.randomUUID();

    user.id = id;

    users.push(user);
    return user;
}

const updateUser = (id: string, updatedUser: User) => {   
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        throw UserNotExistError(id);
    }

    updatedUser.id = id;

    users.splice(userIndex, 1, updatedUser);
    return updatedUser;
}

const deleteUser = (id: string) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        throw UserNotExistError(id);
    }

    users.splice(userIndex, 1);
}

export const db = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}
