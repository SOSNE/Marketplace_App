import Cookies from 'universal-cookie';
import './UserInfoPage.css'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

type InfoType = {
    [key: string]: string | number | null;
    Email: string,
    Username: string,
    FirstName: string,
    LastName: string,
    Gender: string,
    PhoneNumber: number,
    Country: string,
    City: string,
    Address:string

}

function UserInfoPage() {
    const [blankField, setBlankField] = useState<boolean>();
    const [userInfoData, setUserInfoData] = useState<InfoType>();
    const cookies = new Cookies();

    useEffect(() => {
        fetch("http://localhost:8080/userinfo",{
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ token: cookies.get('authToken') })
        }).then(res => res.json())
            .then(data => setUserInfoData(data.userInfoData[0]))
            .then(()=>{
            })
    },[] );

    useEffect(() => {
        console.log(userInfoData);
        if (userInfoData != undefined){
            Object.keys(userInfoData).forEach(value => {
                if(userInfoData[value] == null){
                    setBlankField(true)
                }
            })
        }
    },[userInfoData])
    const navigate  = useNavigate();
    return (
        <div>
            {userInfoData && (
                <>
                    <h1>Welcome {userInfoData.Username}</h1>
                    <div className="mainUserInfoPageBox">
                        <div className="inf">email: {userInfoData.Email}</div>
                        <div className="inf">firstname: {userInfoData.FirstName}</div>
                        <div className="inf">lastname: {userInfoData.LastName}</div>
                        <div className="inf">gender: {userInfoData.Gender}</div>
                        <div className="inf">phone number: {userInfoData.PhoneNumber}</div>
                        <div className="inf">Country: {userInfoData.Country}</div>
                        <div className="inf">City: {userInfoData.City}</div>
                        <div className="inf">Address: {userInfoData.Address}</div>
                        {blankField ? (
                            <button onClick={() => navigate('/adduserinfo', {state: {infoData: userInfoData}})}>Add more
                                information</button>
                        ) : null}
                    </div>
                </>
            )}
        </div>
    );
}

export default UserInfoPage;