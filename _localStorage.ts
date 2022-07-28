import { AuthState } from "store/authSlice";

export function saveToken(token:AuthState){
    const expire = Number(token.expirationTime)
    document.cookie = 'accessToken=' + token.accessToken + `;expires=${new Date(expire)};`
    localStorage.setItem('@hangeulpha',JSON.stringify(JSON.parse(JSON.stringify(token))))
}

export function getToken(){
    const token = localStorage.getItem('@hangeulpha')
    if(token){ return JSON.parse(token) }
    return {} 
}

export function removeToken(){
    document.cookie = 'accessToken' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.removeItem("@hangeulpha");
}