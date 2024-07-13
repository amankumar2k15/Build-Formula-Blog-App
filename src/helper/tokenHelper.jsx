// Data ======>
export const setData = (data) => {
    localStorage.setItem("data", JSON.stringify(data))
}

export const getData = () => {
    return JSON.parse(localStorage.getItem("data"))
}

// Token ======>
export const setToken = (token) => {
    localStorage.setItem("token", token)
}

export const getToken = () => {
    return localStorage.getItem("token")
}

export const removeToken = () => {
    localStorage.removeItem('token');
}
// BlogToken ======>
export const setBlogToken = (token) => {
    localStorage.setItem("token", token)
}

export const getBlogToken = () => {
    return localStorage.getItem("token")
}

export const removeBlogToken = () => {
    localStorage.removeItem('token');
}

// clear local storage
export const clearStorage = () => {
    localStorage.clear();
}