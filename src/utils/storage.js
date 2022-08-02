// LocalStorage FUNC

// Reserve Data
export const setItem = (key, value)=> {
    if(typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}

// Get Item
export const getItem = (key)=> {
    const data = window.localStorage.getItem(key)
    
    // Judge typeof Item
    try {
        return JSON.parse(data)    
    }catch(err) {
        return data
    }
}

// Delete Item
export const removeItem = (key)=> {
    window.localStorage.removeItem(key)
}