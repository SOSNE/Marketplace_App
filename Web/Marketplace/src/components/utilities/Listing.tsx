import {useEffect, useState} from "react";

function Listing(prop:string) {
    const [offers, setOffers] = useState<Array<Offer>>();
    type Offer = {
        ItemName: string,
        Description: string,
        Price: number,
        Username: string,
        PhotoId: number,
        PhotoString:string
    }

    // useEffect(()=>{
    //     fetch("http://localhost:8080/offers")
    //         .then(res => res.json())
    //         .then(res => setOffers(res))
    //     console.log('i fire once');
    // },[]);

    useEffect(() => {
        console.log(prop);
        fetch("http://localhost:8080/offers",{
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"search":prop})
        }).then(res => res.json())
            .then(data => setOffers(data));
    }, [prop]);
    return  (
        <div>
            {offers !== undefined && offers.map((object: Offer, index: number) => (
                <div key={index}>
                    <img src={object.PhotoString} alt={`Photo ${index}`}/>
                    {object.ItemName + " "}
                    {object.Description + " "}
                    {object.Price + " "}
                    {object.Username + " "}
                </div>
            ))}
        </div>
    );
}

export default Listing;