import { getToken } from "./authOperations";

const options={
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
    // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer',
}

const baseURL = "http://localhost:3070"

async function get(url){
    const response = await fetch(baseURL + url, options);
    return await response.json();
}

export {get};