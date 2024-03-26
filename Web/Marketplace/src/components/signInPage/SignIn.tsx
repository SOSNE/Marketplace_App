import {useState} from "react";

let passwordConfirmationVirable1: string, passwordConfirmationVirable2: string, passwordsMatch:boolean;
type SignInDataType = {
    nickName: string;
    email: string;
    password: string;
}
const signInData: SignInDataType = {
    nickName: "",
    email: "",
    password: ""
};
function SignIn() {
    //const [nicksName, setNicksName] = useState<string>();
    const [wrongPasswordMessage, setWrongPasswordMessage] = useState<string>();



    const HandleSignIn = () => {
        if (passwordsMatch){
            fetch("http://localhost:8080/signIn",{
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signInData)
        }).then(()=> console.log("SignIn", signInData))}

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
                    onChange={(e) => signInData.nickName = e.target.value}
                />
                <label>Email</label>
                <input
                    type="text"
                    required
                    onChange={(e) => signInData.email = e.target.value}
                />
                <label>Password</label>
                <input
                    type="text"
                    required
                    onChange={(e) =>{
                        passwordConfirmationVirable2 = e.target.value;
                        handleWrongPasswordConfirmation(e, passwordConfirmationVirable1);
                    }}
                />
                <label>Confirm password</label>
                <input
                    type="text"
                    required
                    onChange={(e) =>{
                        passwordConfirmationVirable1 = e.target.value;
                        signInData.password = e.target.value;
                        handleWrongPasswordConfirmation(e, passwordConfirmationVirable2);
                    }}
                />
                {wrongPasswordMessage}
                <button onClick={HandleSignIn}>
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default SignIn;