import {CheckAuth, LogOut} from "./AuthHandling.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


function LoginLogoutButtonsTopBar() {

    const [isLogIn, setIsLogIn] = useState<boolean>();
    useEffect(() => {
        (
            async ()=>{
                setIsLogIn(await CheckAuth());
            }
        )();
    }, []);

    const navigate  = useNavigate();
    const  handleAuthNavigateLogIn = async ()=> {
        if(!await CheckAuth()){
            navigate('login');
        }
    };
    const handleLogOut = async ()=>{
        LogOut();
        setIsLogIn(await CheckAuth());
    }


    return (
        <div>
            {isLogIn ? (<button className={'logButtons'} onClick={handleLogOut}>Log out</button>)
                : (<button className={'logButtons'} onClick={handleAuthNavigateLogIn}>Log in</button>)}
        </div>
    );
}

export default LoginLogoutButtonsTopBar;