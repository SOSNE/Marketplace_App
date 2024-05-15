
import { GetUserInfo } from "../utilities/AuthHandling";
import './UserInfoPage.css'
import {useEffect, useState} from "react";

function UserInfoPage() {
    const [blankField, setBlankField] = useState<boolean>();
    const getInfo = GetUserInfo("info");
    useEffect(() => {
        Object.keys(getInfo).forEach(value => {
            if(getInfo[value] == null){
                setBlankField(true)
            }
        })
    })

    return (
        <div>
            <h1>Welcome {getInfo.username}</h1>
            <div className="mainUserInfoPageBox">
                <div className="inf">email: {getInfo.email}</div>
                <div className="inf">firstname: {getInfo.firstname}</div>
                <div className="inf">lastname: {getInfo.lastname}</div>
                <div className="inf">gender: {getInfo.gender}</div>
                {blankField? <button>Add more information</button> : null}
            </div>
        </div>
    );
}


export default UserInfoPage;