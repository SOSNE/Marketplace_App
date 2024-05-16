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
                    <h3>Name</h3>
                    <p>{offerData.ItemName}</p>
               
                    <h3>Seller</h3>
                    <p>{offerData.Username}</p>
                    <h3>Price</h3>
                    <p>{offerData.Price}</p>
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