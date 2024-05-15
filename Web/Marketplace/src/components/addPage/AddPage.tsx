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
    const [imageURI, setImageURI] = useState('');
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
                    setImageURI(uri as string);
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
        <div className="containerAddPage">
            <div className="mainInputBox">
                <div className="photoInputBox">
                    <h3>Photo</h3>
                    <label>Select item photo<input
                        type="file"
                        className="fileInput"
                        placeholder="Image"
                        onChange={HandleNewFile}

                        /> </label>
                   
                        {imageURI && <img src={imageURI} alt="Uploaded" className="imageAddPage"/>}
                    </div>

                <div className="textInputBox">
                    <div className="inputBox"><h3>Item Name</h3>
                        <p>Write down what you want to sell :</p>
                        <input
                            className="offerInput"
                            type="text"
                            placeholder="Product Name"
                            onChange={(e) => NewOfferData.productName = e.target.value}
                            />
                        </div>

                        

                        <div className="inputBox">
                                <h3>Price</h3><p>set price for your item</p> 
                                <input
                                    className="offerInput"
                                    type='number'
                                    placeholder="price"
                                    onChange={(e) => NewOfferData.price = parseFloat(e.target.value)}
                            />
                        </div>

                        <div className="inputBox">
                            
                            <h3>Description</h3>
                            <p>Write down about item you want to sell :</p>
                            <textarea   
                                className="offerInput descriptionAddPage"
                                cols={2}
                                rows={5}
                                maxLength={255}
                                name="Text" 
                                placeholder="Description"
                                onChange={(e) => NewOfferData.description = e.target.value}>

                                </textarea>
                        </div>

                            <button onClick={handleOfferSubmit} className="buttonAddPage">Submit</button>
                    </div>
             </div>    
        </div>
    );
}

export default AddPage;