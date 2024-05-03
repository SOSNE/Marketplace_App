import {useState} from "react";
import "./AddPage.css";
import Resizer from 'react-image-file-resizer';
import {CheckAuth, GetUserInfo} from "../utilities/AuthHandling.ts";
        
type NewOfferDataType = {
    productName: string;
    description: string;
    photoString: string;
    price: number;
    token: string;
}
const NewOfferData: NewOfferDataType = {
    productName: "",
    description: "",
    photoString: "",
    price: 0,
    token: GetUserInfo("token")
};
function AddPage() {
    const HandleNewFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            Resizer.imageFileResizer(
                file,
                2000,
                2000,
                'JPEG',
                30,
                0,
                (uri) => {
                    NewOfferData.photoString = uri as string;
                },
                'base64'
            );
        }
    }
    const handleOfferSubmit = async () => {
        if (await CheckAuth())
            fetch("http://localhost:8080/newoffer", {
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(NewOfferData)
        }).then(res => res.json())
    }

    return (
        <div>
                <input
                    type="text"
                    placeholder="Product Name"
                    onChange={(e) => NewOfferData.productName = e.target.value}
                />
                <input
                    type="text"
                    placeholder="Description"
                    onChange={(e) => NewOfferData.description = e.target.value}
                />
                <input
                    type="file"
                    placeholder="Image"
                    onChange={HandleNewFile}
                />
                <input
                    type='number'
                    onChange={(e) => NewOfferData.price = parseFloat(e.target.value)}
                />
                <button onClick={handleOfferSubmit}>Submit
                </button>
        </div>
    );
}

export default AddPage;