import './LoginPage.css'

type LogInnDataType = {
    email: string;
    password: string;
}
const logInnData: LogInnDataType = {
    email: "",
    password: ""
};
function LoginPage() {
    const HandleLogIn = ()=> {
        fetch("http://localhost:8080/login",{
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(logInnData)
        }).then(()=> console.log("LogIn", logInnData))
    }
    return (
        
            <div className={"mainLoginBox"}>
                <form>
                
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
                <button className="loginButton" onChange={HandleLogIn}>
                    Log In
                </button>
                </form>
            </div>
    );
}

export default LoginPage;