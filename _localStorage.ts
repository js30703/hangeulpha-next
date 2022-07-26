import { AuthState } from "store/authSlice";

export function saveToken(token:AuthState){
    localStorage.setItem('@hangeulpha',JSON.stringify(JSON.parse(JSON.stringify(token))))
}

export function getToken(){
    const token = localStorage.getItem('@hangeulpha')

    if(token){ return JSON.parse(token) }
    
    return {}
}

export function removeToken(){
    localStorage.removeItem("@hangeulpha");
}