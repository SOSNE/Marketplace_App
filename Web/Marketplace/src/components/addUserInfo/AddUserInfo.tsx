import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

function AddUserInfo() {
    const {state} = useLocation();
    const { infoData } = state;
    const cookies = new Cookies();
    const SetNewUserData = ()=>{
        console.log(infoData);
        fetch("http://localhost:8080/adduserinfo",{
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({infoData:infoData, token:cookies.get("authToken")})
        }).then(res => res.json())
    }

    return (
        <div>
            {infoData.Email != undefined ? (<div>{infoData.Email}</div>)
                : (<input
                    placeholder="Type your mail ..."
                    type="text"
                    required
                    onChange={(e) => infoData.Email = e.target.value}
                />)}

            {infoData.FirstName != undefined ? (<div>{infoData.FirstName}</div>)
                : (<input
                    placeholder="Type your first name ..."
                    type="text"
                    required
                    onChange={(e) => infoData.FirstName = e.target.value}
                />)}

            {infoData.LastName != undefined ? (<div>{infoData.LastName}</div>)
                : (<input
                    placeholder="Type your last name ..."
                    type="text"
                    required
                    onChange={(e) => infoData.LastName = e.target.value}
                />)}

            {infoData.Gender != undefined ? (<div>{infoData.Gender}</div>)
                : (<input
                    placeholder="Type your gender ..."
                    type="text"
                    required
                    onChange={(e) => infoData.Gender = e.target.value}
                />)}
            {infoData.PhoneNumber != undefined ? (<div>{infoData.PhoneNumber}</div>)
                : (<input
                    placeholder="Type your phone number ..."
                    type="text"
                    required
                    onChange={(e) => infoData.PhoneNumber = e.target.value}
                />)}
            <button onClick={SetNewUserData}>Submit</button>
        </div>
    )
}

export default AddUserInfo;