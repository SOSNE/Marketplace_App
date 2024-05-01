
import TopBar from "./TopBar.tsx";
import Listing from "../utilities/Listing.tsx";
import {IoAddCircleOutline} from "react-icons/io5";
import {HandleAuthNavigate} from "../utilities/AuthHandling.ts";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";
import {useState} from 'react';

function MainPage() {
    const navigate  = useNavigate();
    const  handleAuthNavigate = async ()=> await HandleAuthNavigate(navigate,"add");
    const [inputValue, setInputValue] = useState("");
    const handleChildData = (data: string) => {
        setInputValue(data);
    };
    return (
        <div>
            <TopBar getData={handleChildData}/>
            {inputValue}
            <div className={"offersBox"}>
                <Listing prop={inputValue}/>
            </div>
            <button className={"addButton"} onClick={handleAuthNavigate}>
                <IoAddCircleOutline className={"addButtonImage"}/>
            </button>
        </div>
    );
}

export default MainPage;