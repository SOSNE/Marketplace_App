import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import './AddUserInfo.css'

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
        <div className="addUserInfoContainer">
            <div className="addUserInfoBox">
                <h2>{infoData.Username} complete your profile </h2>
            {infoData.Email != undefined ? (<div className="infAdd">Email: {infoData.Email}</div>)
                : (<input
                    placeholder="Type your mail ..."
                    type="text"
                    required
                    className="inputAddPage"
                    onChange={(e) => infoData.Email = e.target.value}
                />)}

            {infoData.FirstName != undefined ? (<div className="infAdd">Firstname: {infoData.FirstName}</div>)
                : (<input
                    placeholder="Type your first name ..."
                    type="text"
                    className="inputAddPage"
                    onChange={(e) => infoData.FirstName = e.target.value}
                />)}

            {infoData.LastName != undefined ? (<div className="infAdd">Lastname: {infoData.LastName}</div>)
                : (<input
                    placeholder="Type your last name ..."
                    type="text"
                    className="inputAddPage"
                    onChange={(e) => infoData.LastName = e.target.value}
                />)}

            {infoData.Gender != undefined ? (<div className="infAdd">Gender: {infoData.Gender}</div>)
                : (<input
                    placeholder="Type your gender ..."
                    type="text"
                    required
                    className="inputAddPage"
                    onChange={(e) => infoData.Gender = e.target.value}
                />)}
            {infoData.PhoneNumber != undefined ? (<div className="infAdd">PhoneNumber: {infoData.PhoneNumber}</div>)
                : (<input
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                    placeholder="Type aa phone number ..."
                    type="tel"
                    pattern="{[0-9]{3}-[0-9]{3}-[0-9]{4}}"
                    required
                    className="inputAddPage"
                    onChange={(e) => {
                        console.log(e.target.value)
                        infoData.PhoneNumber = e.target.value
                    }}
                />)}
            {infoData.Country != undefined ? (<div className="infAdd">Country: {infoData.Country}</div>)
                : (<input
                    placeholder="Type your Country ..."
                    type="text"
                    required
                    className="inputAddPage"
                    onChange={(e) => infoData.Country = e.target.value}
                />)}
            {infoData.City != undefined ? (<div className="infAdd">City: {infoData.City}</div>)
                : (
                    <input
                    placeholder="Type your City ..."
                    type="text"
                    required
                    className="inputAddPage"
                    onChange={(e) => infoData.City = e.target.value}
                />)}
            {infoData.Address != undefined ? (<div className="infAdd">Address: {infoData.Address}</div>)
                : (<input
                    placeholder="Type your Address ..."
                    type="text"
                    className="inputAddPage"
                    required
                    onChange={(e) => infoData.Address = e.target.value}
                />)}
            <button onClick={SetNewUserData} className="addInfoButton">Submit</button>
        </div>
        </div>
    )
}

export default AddUserInfo;