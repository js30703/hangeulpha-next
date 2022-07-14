import axios from "axios";

const  SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || ''

const Axios = axios.create({
    baseURL: SERVER_URL,
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export async function getVerbs(){
    return Axios({
      method:'get',
      url:"/api/verbs",
    })
}