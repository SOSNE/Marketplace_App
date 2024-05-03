import {useEffect, useState} from "react";
import "./Listing.css";

function Listing() {
    const [offers, setOffers] = useState<Array<Offer>>();
    type Offer = {
        ItemName: string,
        Description: string,
        Price: number,
        Username: string,
        PhotoId: number,
        PhotoString:string
    }

    useEffect(()=>{
        fetch("http://localhost:8080/offers")
            .then(res => res.json())
            .then(res => setOffers(res))
        console.log('i fire once');
    },[]);

    return  (
        <div>
            {offers !== undefined && offers.map((object: Offer, index: number) => (
                <div key={index} className="offerBox">
                    <img className="image" src={object.PhotoString} alt={`Photo ${index}`}/>
                    <h3 className="itemName">{object.ItemName + " "}</h3>
                    <p className="price">{object.Price + "$ "}</p>
               
                </div>
            ))}
        </div>
    );
}

export default Listing;