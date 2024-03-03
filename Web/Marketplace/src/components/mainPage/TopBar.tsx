//import React from 'react';
import './TopBar.css'


function TopBar() {

    return (
        <div className={'box'}>
            <div className={'account'}></div>
            <div className={'search'}>
                <input className={'inputField'}/>
            </div>
        </div>
    );
}

export default TopBar;