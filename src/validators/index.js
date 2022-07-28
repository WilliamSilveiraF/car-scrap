export const validateData = (keys, data) => {
    if (data === undefined) {
        return keys 
    }
    const errors = []
    keys.map(key => {
        if (!data[key] || data[key] === undefined) {
            errors.push(key)
        }
    })
    return errors
}