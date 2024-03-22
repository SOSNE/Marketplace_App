//import React from 'react';

import {useState} from "react";

function LoginPage() {
    const [nickName, setNickName] = useState<string>();
    const [email, setemail] = useState<string>();
    return (
        <div>
            <div className={"mainBox"}>
                <p>Login</p>
                <label>Nick Name</label>
                <input
                    type="text"
                    required
                    onChange={(e) => setNickName(e.target.value)}
                />
                {nickName}
                <label>Email</label>
                <input
                    type="text"
                    required
                    onChange={(e) => setemail(e.target.value)}
                />
                {email}
            </div>
        </div>
    );
}

export default LoginPage;