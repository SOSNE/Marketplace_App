import { useLocation } from "react-router-dom";


function OfferPage() {
    const {state} = useLocation();
    const { offerData } = state;

    return (
        <div>
            {offerData.ItemName}
        </div>
    );
}

export default OfferPage;