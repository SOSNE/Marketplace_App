//import React from 'react';
import './TopBar.css'
import { FiUser } from "react-icons/fi";
import { HandleAuthNavigate } from "../utilities/AuthHandling.ts";
import { useNavigate } from "react-router-dom";
// import { CiSettings } from "react-icons/ci";
// import { GrInstall } from "react-icons/gr";
// import { CiSquareQuestion } from "react-icons/ci";

import LoginLogoutButtonsTopBar from "../utilities/LoginLogoutButtonsTopBar.tsx";


interface TopBarProps {
    getData: (data: string) => void;
}

function TopBar(props:TopBarProps) {
    const inputDataToParent = (data:string) => {
        console.log(data)
        props.getData(data);
    };

    const navigate  = useNavigate();
    const  handleAuthNavigateUserInfo = async ()=> await HandleAuthNavigate(navigate,"userinfo");

    return (
        <div className={'topBar'}>
            <button className={'accountButton'} onClick={handleAuthNavigateUserInfo}>
                <FiUser className={'userAccountImage'}/>
            </button>
            <div className={'search'}>
                <input
                    className={'inputField'}
                    onChange={(e) => inputDataToParent(e.target.value)}
                />
            </div>
            <div className={'buttons'}>
                {/*<button className={'button settings'}><CiSettings className={'buttonImage'}/>*/}
                {/*</button>*/}
                {/*<button className={'button yourOffer'}><GrInstall className={'buttonImage'}/></button>*/}
                {/*<button className={'button about'}><CiSquareQuestion className={'buttonImage'}/>*/}
                {/*</button>*/}
                <LoginLogoutButtonsTopBar/>
            </div>
        </div>
    );
}

export default TopBar;