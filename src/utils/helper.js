export const isAuthenticated = () => {
    if (localStorage.getItem('KabadiwallaaJwt')) {
        return JSON.parse(localStorage.getItem('KabadiwallaaJwt'))
    }
    return false
}

export const isUser = () => {
    if (localStorage.getItem('KabadiwallaaUser')) {
        return JSON.parse(localStorage.getItem('KabadiwallaaUser'))
    }
    return false
}