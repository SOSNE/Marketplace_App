//import React from 'react';
import TopBar from "./TopBar.tsx";
import Listing from "../utilities/Listing.tsx";
import {IoAddCircleOutline} from "react-icons/io5";
import {HandleAuthNavigate} from "../utilities/AuthHandling.ts";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";


function MainPage() {
    const navigate  = useNavigate();
    const  handleAuthNavigate = async ()=> await HandleAuthNavigate(navigate,"add");
    return (
        <div>
            <TopBar/>
            <div className={"offersBox"}>
                <Listing/>
            </div>
            <button className={"addButton"} onClick={handleAuthNavigate}>
                <IoAddCircleOutline className={"addButtonImage"}/>
            </button>
            <footer className="fotter"><p>@cukier prosty</p></footer>
           
        </div>
    );
}

export default MainPage;