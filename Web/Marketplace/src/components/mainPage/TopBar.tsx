//import React from 'react';
import './TopBar.css'
import { FiUser } from "react-icons/fi";
import {HandleAuthNavigate} from "../utilities/AuthHandling.ts";
import {useNavigate} from "react-router-dom";

function TopBar() {

    const navigate  = useNavigate();
    const  handleAuthNavigate = async ()=> await HandleAuthNavigate(navigate,"userinfo");
    return (
        <div className={'topBar'}>
            <button className={'accountButton'} onClick={handleAuthNavigate}>
                <FiUser className={'userAccountImage'} />
            </button>
            <div className={'search'}>
                <input className={'inputField'}/>
            </div>
        </div>
    );
}

export default TopBar;