import React, {useState} from "react";
import './SignUpPage.css';
import { useNavigate } from "react-router-dom";

let passwordConfirmationVariable1: string, passwordConfirmationVariable2: string, passwordsMatch:boolean;
type SignUpDataType = {
    nickName: string;
    email: string;
    password: string;
}
const signUpData: SignUpDataType = {
    nickName: "",
    email: "",
    password: ""
};
function SignUpPage() {
    const navigate = useNavigate();
    // const [wrongPasswordMessage, setWrongPasswordMessage] = useState<string>();
    const [feedBackMessage, setFeedBackMessage] = useState<string>('');
    const goToLogIn = ()=> {

        navigate("/login");
    };


    const HandleSignUp = () => {
        console.log(signUpData);
        if (passwordsMatch){
            fetch("http://localhost:8080/signup",{
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signUpData)
        }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.status == true){
                        setFeedBackMessage("Signup succeed, check your email");
                    }else {
                        setFeedBackMessage("Signup filed");
                    }
                })
        }else {setFeedBackMessage("Signup filed");}

    }
    const handleWrongPasswordConfirmation = (e:React.ChangeEvent<HTMLInputElement> , passwordConfirmationVariable:string) =>{
        if (passwordConfirmationVariable == e.target.value || e.target.value == ""){
            setFeedBackMessage("")
            passwordsMatch = true;
        }else {
            passwordsMatch = false;
            setFeedBackMessage("Password and confirm password must be the same");
        }
    }

    return (
        <div className="containerSignUp">

            <div className={"signUpMainBox"}>
                <h1>Sign In</h1>
                <input
                    className="nicknameSingUpInput"
                    type="text"
                    placeholder="nickname..."
                    required
                    onChange={(e) => signUpData.nickName = e.target.value}
                />
                <input
                    className="mailSignUpInput"
                    placeholder="email..."
                    type="text"
                    required
                    onChange={(e) => signUpData.email = e.target.value}
                />
                <input
                    className="passwordSingUpInput"
                    type="password"
                    placeholder="password..."
                    required
                    onChange={(e) =>{
                        passwordConfirmationVariable2 = e.target.value;
                        handleWrongPasswordConfirmation(e, passwordConfirmationVariable1);
                    }}
                />
                <input
                    className="passwordSingUpInput"
                    type="password"
                    placeholder="confirm password..."
                    required
                    onChange={(e) =>{
                        passwordConfirmationVariable1 = e.target.value;
                        signUpData.password = e.target.value;
                        handleWrongPasswordConfirmation(e, passwordConfirmationVariable2);
                    }}
                />
                
                <button onClick={HandleSignUp} className="signUpButton">
                    Sign In
                </button>
                <p className="wrongPassMessage">{feedBackMessage}</p>
                {/*{feedBackMessage}*/}
                <button className="loginButton" onClick={goToLogIn}>
                    Log In
                </button>
            </div>
        </div>
    );
}
export default SignUpPage;