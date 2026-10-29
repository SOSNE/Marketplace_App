import {useEffect, useState} from "react";
import "./Listing.css";
import { useNavigate } from "react-router-dom";


function Listing({prop}: {prop: string}) {
    const [offers, setOffers] = useState<Array<Offer>>();
    const navigate  = useNavigate();
    type Offer = {
        ItemId: number;
        ItemName: string,
        Description: string,
        Price: number,
        Username: string,
        PhotoId: number,
        PhotoString:string
    }
  
    useEffect(() => {
        fetch("http://localhost:8080/offers",{
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"search":prop})
        }).then(res => res.json())
            .then(data => setOffers(data));
    }, [prop]);
    console.log(offers);
    return  (
        <>
            {offers !== undefined && offers.map((object: Offer, index: number) => (
                <div key={index} className="offerBox" onClick={() => navigate("offer", { state: { offerData: object } })}>
                    <img className="image" src={object.PhotoString} alt={`Photo ${index}`}/>
                    <h3 className="itemName">{object.ItemName + " "}</h3>
                    <p className="price">{"$"+object.Price }</p>
                </div>
            ))}
        </>
    );
}

export default Listing;