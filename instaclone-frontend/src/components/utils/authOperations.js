function getToken(){
    if (window.localStorage){
        return localStorage.getItem('token');
    }
    return false;
}

function isAuthenticated(){
    if(window.localStorage){
        const token = localStorage.getItem('token');
        return Boolean(token);
    }
    return false;
}

function setToken(token) {
    if (window.localStorage) {
        localStorage.setItem("token", token);
    }
}

export {getToken, isAuthenticated, setToken};