//import React from 'react';
//import MainPage from "../mainPage/MainPage.tsx";

import {useEffect, useState} from "react";


function Listing() {

    const [offers, setOffers] = useState<Array<Offer>>();
    type Offer = {
        ItemName: string,
        Description: string,
        Price: number,
        FirstName: string,
        Username: string,
    }

    useEffect(()=>{
        fetch("http://localhost:8080/offers")
            .then(res => res.json())
            //.then(res => )
            .then(res => setOffers(res))
    },[])
    useEffect(()=>{
        console.log(offers)
    }, [])

    return (
        <div>
            {offers != undefined && offers.map((object: Offer) =>(
                <div>
                    {object.ItemName + " "}
                    {object.Description + " "}
                    {object.Price + " "}
                    {object.Username + " "}
                    {object.FirstName + " "}
                </div>
            ))}
        </div>
    );
}

export default Listing;