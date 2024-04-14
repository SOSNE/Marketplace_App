import Cookies from 'universal-cookie';
import {NavigateFunction } from "react-router-dom";
const cookies = new Cookies();

type userDataObjectType = {
    token: string,
    email: string,
    username: string
}
export function AuthHandling(userDataObject: userDataObjectType) {

    if(cookies.get('authToken') == undefined){
        const userInfoObject = {
            email: userDataObject.email,
            username:  userDataObject.username
        }
        cookies.set('authToken', userDataObject.token, { path: '/', httpOnly: false, secure: false });
        cookies.set('userInfoStorage', JSON.stringify(userInfoObject), { path: '/', httpOnly: false, secure: false });
    }
}
let response: boolean;
export async function CheckAuth(){
    const jsonObject =  { text:  cookies.get('authToken') };

   await fetch("http://localhost:8080/auth", {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(jsonObject)
    }).then(res => res.json()).then(res => response = res)
    return response
}
export async function HandleAuthNavigate(navigateHook: NavigateFunction,to:string, authFailedDestination = "login"){
    if( await CheckAuth()){
        navigateHook(to);
    }else navigateHook(authFailedDestination);
}
