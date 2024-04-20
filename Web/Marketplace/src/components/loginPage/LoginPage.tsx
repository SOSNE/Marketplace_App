import './LoginPage.css'
import {AuthHandling, CheckAuth} from "../utilities/AuthHandling.ts";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

type LogInnDataType = {
    email: string;
    password: string;
}
const logInnData: LogInnDataType = {
    email: "",
    password: ""
};
function LoginPage() {
    const navigate = useNavigate();
    const [checklog,setchecklog] = useState("");
    const HandleLogIn = ()=> {
        fetch("http://localhost:8080/login",{
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(logInnData)
        }).then(res => res.json())
            .then(res =>{
                if (res.text == "error while login"){
                    console.log(res.text);
                    setchecklog("failed login");
                }else {
                    console.log("LogIn", res);
                    AuthHandling(res);
                    navigate("/");
                    
                }
            })
    }
    return (
        
            <div className={"mainLoginBox"}>

                <h1>Login</h1>
                <input
                    placeholder="Type your mail ..."
                    id="mail"
                    className="mailLoginInput"
                    type="text"
                    required
                    onChange={(e) => logInnData.email = e.target.value}
                />
                <input
                    placeholder="Type your password ..."
                    id="password"
                    className="passwordLoginInput"
                    type="password"
                    required
                    onChange={(e) => logInnData.password = e.target.value}
                />
                <button className="loginButton" onClick={HandleLogIn}>
                    Log In
                </button>

                <button onClick={async () =>  {
                   console.log( await CheckAuth())}
                }>
                    auth
                </button>
                <p> {checklog} </p>

            </div>
    );
}

export default LoginPage;