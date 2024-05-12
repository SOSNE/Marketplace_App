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
        <div>
                
        <div className="container">
        
            <div className="offerImageBox">   
            <button className="backButton"onClick={goBack}>&larr;Go Back</button>   
                <img className="offerImage" src={offerData.PhotoString} alt=""/>
               
            </div>
             
              
               <div className="offerInfoBox">
                    <h2>{offerData.ItemName}</h2>
                    <p>price: ${offerData.Price}</p>
                    <p>Seller: {offerData.Username} </p>     
                </div>
                <hr></hr>
                <div className="offerDescriptionBox">
                
                <h2>Description: </h2>
                {offerData.Description}
                <p>Offer number: {offerData.ItemId}</p> 
                </div> 
                
                
              
            </div>
            <footer className="fotter"><p>@cukier prosty</p></footer>
        </div>
    );
}

export default OfferPage;