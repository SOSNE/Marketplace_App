import {useLocation, useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";

function AddUserInfo() {
    const {state} = useLocation();
    const { infoData } = state;
    const cookies = new Cookies();
    const navigate = useNavigate();
    const SetNewUserData = ()=>{
        console.log(infoData);
        fetch("http://localhost:8080/adduserinfo",{
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({infoData:infoData, token:cookies.get("authToken")})
        }).then(res => res.json())
        navigate("/userinfo")
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

                    onChange={(e) => infoData.FirstName = e.target.value}
                />)}

            {infoData.LastName != undefined ? (<div>{infoData.LastName}</div>)
                : (<input
                    placeholder="Type your last name ..."
                    type="text"

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
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                    placeholder="Type aa phone number ..."
                    type="tel"
                    pattern="{[0-9]{3}-[0-9]{3}-[0-9]{4}}"
                    required
                    onChange={(e) => {
                        console.log(e.target.value)
                        infoData.PhoneNumber = e.target.value
                    }}
                />)}
            {infoData.Country != undefined ? (<div>{infoData.Country}</div>)
                : (<input
                    placeholder="Type your Country ..."
                    type="text"
                    required
                    onChange={(e) => infoData.Country = e.target.value}
                />)}
            {infoData.City != undefined ? (<div>{infoData.City}</div>)
                : (<input
                    placeholder="Type your City ..."
                    type="text"
                    required
                    onChange={(e) => infoData.City = e.target.value}
                />)}
            {infoData.Address != undefined ? (<div>{infoData.Address}</div>)
                : (<input
                    placeholder="Type your Address ..."
                    type="text"
                    required
                    onChange={(e) => infoData.Address = e.target.value}
                />)}
            <button onClick={SetNewUserData}>Submit</button>
        </div>
    )
}

export default AddUserInfo;