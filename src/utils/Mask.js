export const einMask = (value) => {

    if (value !== undefined && value.length >= 2 && !value.includes('-')) {
        const [first, second] = [value.slice(0, 2), value.slice(2)]
        return `${first}-${second}`
    }
    return value
}

export const usContactMask = (value) => {
    if (!value || value === undefined) {
        return value
    }

    const x = value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
    
    if (!x || x === undefined) {
        return x
    }
    return ('(' + x[1] + ') ' + x[2] + '-' + x[3])
}