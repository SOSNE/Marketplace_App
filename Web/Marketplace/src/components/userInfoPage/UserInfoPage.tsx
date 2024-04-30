
import { GetUserInfo } from "../utilities/AuthHandling";
import './UserInfoPage.css'

function UserInfoPage() {
    const getInfo = GetUserInfo("info");
   console.log(getInfo)

   
   
    return (  
        <div>
        <h1>Welcom {getInfo.username}</h1>
        <div className="mainUserInfoPageBox">
           <div className="inf">email: {getInfo.email}</div>
           <div className="inf">firstname : {getInfo.firstname}</div>
           <div className="inf">lastname :{getInfo.lastname}</div>
           <div className="inf">gender :{getInfo.gender}</div>
        </div>
        </div>
    );
}


export default UserInfoPage;