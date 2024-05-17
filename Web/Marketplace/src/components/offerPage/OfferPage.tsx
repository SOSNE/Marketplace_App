import { useLocation } from "react-router-dom";

import "./OfferPage.css";
import { useNavigate } from "react-router-dom";

function OfferPage() {
    const {state} = useLocation();

    const navigate = useNavigate();
    const { offerData } = state;
    const goBack = ()=> {

        navigate("/");
    };
    
    return (
        <div className="containerOfferPage">
            <div className="mainOfferPageBox">
                <div className="photoOfferPageBox">
                    <img className="imageOfferPage" src={offerData.PhotoString} alt=""/>   
                </div>
            <div className="textOfferPageBox">
                    <button className="buttonOfferPage"onClick={goBack}>&#10005;</button> 
                <div className="offerPageBox">
                    <h2>{offerData.ItemName}</h2>
                    <h3>Price</h3>
                    <p>${offerData.Price}</p>
                    <h3>Contact</h3>
                    <p>Seller: {offerData.FirstName} {offerData.LastName}</p>
                    <p>tel: {offerData.PhoneNumber}</p>
                    
                    <h3>Location</h3>
                    <p>{offerData.Country} , {offerData.City} , {offerData.Address}</p>
                    
                 </div>

            <div className="offerPageDescriptionBox">
                <h3>Description</h3>
                <p>{offerData.Description}</p>
            </div>
               
        </div>
        </div> 
    </div>
    );
}

export default OfferPage;