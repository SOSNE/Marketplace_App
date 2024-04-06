//import React from 'react';
import './TopBar.css'
import { FiUser } from "react-icons/fi";

function TopBar() {

    return (
        <div className={'topBar'}>
            <button className={'accountButton'}>
                <FiUser className={'userAccountImage'} />
            </button>
            <div className={'search'}>
                <input className={'inputField'}/>
            </div>
        </div>
    );
}

export default TopBar;