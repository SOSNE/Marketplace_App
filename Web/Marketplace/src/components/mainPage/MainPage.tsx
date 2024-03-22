//import React from 'react';
import TopBar from "./TopBar.tsx";
import Listing from "../utilities/Listing.tsx";
import {IoAddCircleOutline} from "react-icons/io5";
import "./MainPage.css";
import {Link} from "react-router-dom";

function MainPage() {
    return (
        <div>
            <TopBar/>
            <div className={"offersBox"}>
                <Listing/>
            </div>
            <Link to={"add"}>
                <button className={"addButton"}>
                    <IoAddCircleOutline className={"addButtonImage"}/>
                </button>
            </Link>
        </div>
    );
}

export default MainPage;