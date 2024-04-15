import {useState} from "react";
import "./AddPage.css";
type NewOfferDataType = {
    productName: string;
    description: string;
    photoString: string;
    price: number;
}
const NewOfferData: NewOfferDataType = {
    productName: "",
    description: "",
    photoString: "",
    price: 0,
};
function AddPage() {
    const [img , setImg] = useState<string>();
    const HandleNewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();
        if(file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                NewOfferData.photoString = reader.result as string;
            };
        }
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
                <button onClick={() => {
                    console.log(NewOfferData);
                    setImg(NewOfferData.photoString);
                }}>Submit
                </button>
            <img className={"addImage"} src={img} alt="Decoded"/>
        </div>
    );
}

export default AddPage;