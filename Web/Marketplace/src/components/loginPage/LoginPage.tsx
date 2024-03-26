

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
        fetch("http://localhost:8080/signIn",{
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(logInnData)
        }).then(()=> console.log("SignIn", logInnData))
    }
    return (
        <div>
            <div className={"mainBox"}>
                <p>Login</p>
                <label>Email</label>
                <input
                    type="text"
                    required
                    onChange={(e) => logInnData.email = e.target.value}
                />

                <label>Password</label>
                <input
                    type="text"
                    required
                    onChange={(e) => logInnData.password = e.target.value}
                />
                <button onClick={HandleLogIn}>
                    LogIn
                </button>
            </div>
        </div>
    );
}

export default LoginPage;