//import React from 'react';
import TopBar from "./TopBar.tsx";
import Listing from "../utilities/Listing.tsx";
import {IoAddCircleOutline} from "react-icons/io5";
import "./MainPage.css";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";



function MainPage() {
    const [offers, setOffers] = useState<Array<Offer>>();
    type Offer = {
        name: string,
        surname: string,
    }

    useEffect(()=>{
        fetch("http://localhost:8080/offers")
            .then(res => res.json())
            .then(res => setOffers(res))
    })

    return (
        <div>
            <TopBar/>
            <div className={"offersBox"}>
                {offers != undefined && <Listing objects={offers}/>}
            </div>
            <Link to={"add"}>
                <button className={"addButton"} >
                    <IoAddCircleOutline className={"addButtonImage"}/>
                </button>
            </Link>
        </div>
    );
}

export default MainPage;