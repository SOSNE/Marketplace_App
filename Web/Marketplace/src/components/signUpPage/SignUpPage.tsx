import React, {useState} from "react";

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
    //const [nicksName, setNicksName] = useState<string>();
    const [wrongPasswordMessage, setWrongPasswordMessage] = useState<string>();



    const HandleSignUp = () => {
        if (passwordsMatch){
            fetch("http://localhost:8080/signup",{
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signUpData)
        }).then(()=> console.log("SignUp", signUpData))}

    }
    const handleWrongPasswordConfirmation = (e:React.ChangeEvent<HTMLInputElement> , passwordConfirmationVariable:string) =>{
        if (passwordConfirmationVariable == e.target.value || e.target.value == ""){
            setWrongPasswordMessage("")
            passwordsMatch = true;
        }else {
            passwordsMatch = false;
            setWrongPasswordMessage("Password and confirm password must be the same");
        }
    }

    return (
        <div>
            <div className={"mainBox"}>
                <p>SignIn</p>
                <label>Nick name</label>
                <input
                    type="text"
                    required
                    onChange={(e) => signUpData.nickName = e.target.value}
                />
                <label>Email</label>
                <input
                    type="text"
                    required
                    onChange={(e) => signUpData.email = e.target.value}
                />
                <label>Password</label>
                <input
                    type="text"
                    required
                    onChange={(e) =>{
                        passwordConfirmationVariable2 = e.target.value;
                        handleWrongPasswordConfirmation(e, passwordConfirmationVariable1);
                    }}
                />
                <label>Confirm password</label>
                <input
                    type="text"
                    required
                    onChange={(e) =>{
                        passwordConfirmationVariable1 = e.target.value;
                        signUpData.password = e.target.value;
                        handleWrongPasswordConfirmation(e, passwordConfirmationVariable2);
                    }}
                />
                {wrongPasswordMessage}
                <button onClick={HandleSignUp}>
                    Sign In
                </button>
            </div>
        </div>
    );
}
export default SignUpPage;