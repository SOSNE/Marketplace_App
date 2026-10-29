
import TopBar from "./TopBar.tsx";
import Listing from "../utilities/Listing.tsx";
import {IoAddCircleOutline,} from "react-icons/io5";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import {HandleAuthNavigate} from "../utilities/AuthHandling.ts";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";
import {useState} from 'react';
function MainPage() {
    const navigate  = useNavigate();
    const  handleAuthNavigate = async ()=> await HandleAuthNavigate(navigate,"add");
    const [inputValue, setInputValue] = useState<string>("");
    const handleChildData = (data: string) => {
        setInputValue(data);
    };

    return (
        <div>
            <TopBar getData={handleChildData}/>
            <div className={"offersBoxMainPage"}>
                <Listing prop={inputValue}/>
            </div>
            <button className={"addButton"} onClick={handleAuthNavigate}>
                <IoAddCircleOutline className={"addButtonImage"}/>
            </button>
            <footer className="fotter">
            <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>We are a leading company offering the highest quality products and services. Our goal is customer satisfaction.</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Address: 1 Example Street, 12345 City</p>
            <p>Phone: +1 234 567 890</p>
            <p>Email: <a href="mailto:contact@example.com">contact@example.com</a></p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="footer-icons">
              <a href="#"><FaFacebook /><span>Facebook</span></a>
              <a href="#"><FaTwitter /><span>Twitter</span></a>
              <a href="#"><FaInstagram /><span>Instagram</span></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
         </footer>
           
        </div>
    );
}

export default MainPage;