//import React from 'react';
import './TopBar.css'
import { FiUser } from "react-icons/fi";
import {HandleAuthNavigate} from "../utilities/AuthHandling.ts";
import {useNavigate} from "react-router-dom";

interface TopBarProps {
    getData: (data: string) => void;
}

function TopBar(props:TopBarProps) {
    const inputDataToParent = (data:string) => {
        console.log(data)
        props.getData(data);
    };

    const navigate  = useNavigate();
    const  handleAuthNavigate = async ()=> await HandleAuthNavigate(navigate,"userinfo");
    return (
        <div className={'topBar'}>
            <button className={'accountButton'} onClick={handleAuthNavigate}>
                <FiUser className={'userAccountImage'} />
            </button>
            <div className={'search'}>
                <input
                    className={'inputField'}
                    onChange={(e) => inputDataToParent(e.target.value)}
                />
            </div>
        </div>
    );
}

export default TopBar;