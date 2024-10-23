export function findKeysWithBoolean(obj) {
    return Object.keys(obj).filter((key) => {
        const value = obj[key];
        return typeof value === 'object' && value !== null && 'boolean' in value;
    });
}

export function findKeysWithIcon(obj) {
    return Object.keys(obj).filter((key) => {
        const value = obj[key];
        return typeof value === 'object' && value !== null && value.icon.enabled === true;
    });
}