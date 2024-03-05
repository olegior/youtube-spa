export const setLocalStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value)
}

export const getLocalStorage = (key: string): string => {
    return localStorage.getItem(key) || "{}";
}

export const deleteLocalStorage = (key: string): void => {
    localStorage.removeItem(key)
}