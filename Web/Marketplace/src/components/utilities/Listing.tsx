//import React from 'react';
//import MainPage from "../mainPage/MainPage.tsx";

type Offer = {
    name: string,
    surname: string,
}

function Listing({objects}: { objects: Array<Offer> }) {

    return (

        <div>
            {objects.map((object: Offer) =>(
                <div>
                    {object.name + " "}
                    {object.surname}
                </div>
            ))}
        </div>
    );
}

export default Listing;