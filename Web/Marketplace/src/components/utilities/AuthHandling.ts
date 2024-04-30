import Cookies from 'universal-cookie';
import {NavigateFunction } from "react-router-dom";

const cookies = new Cookies();

type userDataObjectType = {
    token: string,
    email: string,
    username: string,
    firstname: string,
    lastname: string,
    gender: string,
    dateOfBirth : string ,
}
export function AuthHandling(userDataObject: userDataObjectType) {

    if(cookies.get('authToken') == undefined){
        const userInfoObject = {
            email: userDataObject.email,
            username:  userDataObject.username,
            firstname: userDataObject.firstname,
            lastname: userDataObject.lastname,
            gender: userDataObject.gender,
            dateOfBirth: userDataObject.dateOfBirth,
        }
        cookies.set('authToken', userDataObject.token, { path: '/', httpOnly: false, secure: false });
        cookies.set('userInfoStorage', JSON.stringify(userInfoObject), { path: '/', httpOnly: false, secure: false });
    }
}

export async function CheckAuth(): Promise<boolean>{
    const jsonObject =  { text:  cookies.get('authToken') };

    const response = await fetch("http://localhost:8080/auth", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonObject)
    });
    const data = await response.json();
    return data
}
export async function HandleAuthNavigate(navigateHook: NavigateFunction,to:string, authFailedDestination = "login"){
    if( await CheckAuth()){
        navigateHook(to);
    }else navigateHook(authFailedDestination);
}
export function GetUserInfo(prefix:string) {
    if (prefix == null || prefix == "info"){
        return cookies.get('userInfoStorage')
    }else if (prefix == "token"){
        return cookies.get('authToken')
    }
}