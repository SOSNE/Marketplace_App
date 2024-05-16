import "./AddPage.css";
import Resizer from 'react-image-file-resizer';
import {CheckAuth, GetUserInfo} from "../utilities/AuthHandling.ts";
import {useEffect, useState} from "react";
import Cookies from "universal-cookie";
        
type NewOfferDataType = {
    [key: string]: string | number | null;
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

type InfoType = {
    [key: string]: string | number | null;
    Email: string,
    Username: string,
    FirstName: string,
    LastName: string,
    Gender: string,
    PhoneNumber: number
}

function AddPage() {
  
    const [userInfoData, setUserInfoData] = useState<InfoType>();
    const [imageURI, setImageURI] = useState('');
    const cookies = new Cookies();

    useEffect(() => {
        fetch("http://localhost:8080/userinfo",{
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ token: cookies.get('authToken') })
        }).then(res => res.json())
            .then(data => setUserInfoData(data.userInfoData[0]))
            .then(()=>{
            })
    },[] );

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
        let BlancField = true
        if ( userInfoData != undefined){
            Object.keys(userInfoData).forEach(value => {
                if(userInfoData[value] == null){
                    BlancField = false
                }
            })
        }
        Object.keys(NewOfferData).forEach(value => {
            if(NewOfferData[value] == ""|| NewOfferData[value] == 0){
                BlancField = false
            }
        })
        if (BlancField && await CheckAuth()){
            console.log("start ",BlancField)
            fetch("http://localhost:8080/newoffer", {
                method: "POST",
                mode: "cors",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(NewOfferData)
            }).then(res => res.json())
        }
    }

    return (
        <div className="containerAddPage">
            <div className="mainInputBox">
                <div className="photoInputBox">
                    <h3 className="titleAddPage">Photo</h3>
                    <label>Select item photo<input
                        type="file"
                        className="fileInput"
                        placeholder="Image"
                        onChange={HandleNewFile}
                        required
                        /> </label>
                   
                        {imageURI && <img src={imageURI} alt="Uploaded" className="imageAddPage"/>}
                    </div>

                <div className="textInputBox">
                    <div className="inputBox">
                        <h3 className="titleAddPage">Item Name</h3>
                        <p className="textAddPage">Write down what you want to sell :</p>
                        <input
                            className="offerInput"
                            type="text"
                            placeholder="Product Name"
                            required
                            onChange={(e) => NewOfferData.productName = e.target.value}
                            />
                        </div>

                        

                        <div className="inputBox">
                                <h3 className="titleAddPage">Price</h3>
                                <p className="textAddPage">set price for your item</p> 
                                <input
                                    className="offerInput"
                                    type='number'
                                    placeholder="price"
                                    required
                                    onChange={(e) => NewOfferData.price = parseFloat(e.target.value)}
                            />
                        </div>

                        <div className="inputBox">
                            
                            <h3 className="titleAddPage">Description</h3>
                            <p className="textAddPage">Write down about item you want to sell :</p>
                            <textarea   
                                className="offerInput descriptionAddPage"
                                cols={2}
                                rows={5}
                                maxLength={1024}
                                name="Text" 
                                placeholder="Description"
                                required
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