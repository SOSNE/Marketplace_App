//import React from 'react';
import TopBar from "./TopBar.tsx";
import Listing from "../utilities/Listing.tsx";
import {IoAddCircleOutline} from "react-icons/io5";
import {CheckAuth} from "../utilities/AuthHandling.ts";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";


function MainPage() {
    const navigate  = useNavigate();
    const route = async () => {
        if( await CheckAuth()){
            navigate("add");
        }else navigate("login");
    }
    return (
        <div>
            <TopBar/>
            <div className={"offersBox"}>
                <Listing/>
            </div>
            <button className={"addButton"} onClick={route}>
                <IoAddCircleOutline className={"addButtonImage"}/>
            </button>
        </div>
    );
}

export default MainPage;