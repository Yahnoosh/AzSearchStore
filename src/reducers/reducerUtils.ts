import * as objectAssign from "object-assign";

export function updateObject<T, U>(oldObject: T, newValues: U): T {
    return objectAssign({}, oldObject, newValues);
}

export function updateObjectAtKey<T>(oldObject: { [key: string]: T }, entry: T, key: string) {
    let newObject: { [key: string]: T } = {};
    newObject[key] = entry;
    return updateObject(oldObject, newObject);
}

// todo(evboyle): create reducer util