
export function KeysToUpperCase(obj) {
    const me = this;
    if (typeof (obj) === 'string' || typeof (obj) === 'number' || typeof (obj) === 'boolean') {
        return obj;
    }
    const keys = Object.keys(obj);
    let n = keys.length;
    let lowKey;
    while (n--) {
        const key = keys[n];
        lowKey = key.toUpperCase();
        obj[lowKey] = KeysToUpperCase(obj[key]);
        if (key !== lowKey) {
            delete obj[key];
        }
    }
    return (obj);
}
