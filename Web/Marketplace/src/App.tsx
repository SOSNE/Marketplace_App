import './App.css'
import MainPage from "./components/mainPage/MainPage.tsx";
import {
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import AddPage from "./components/addPage/AddPage.tsx";
import LoginPage from "./components/loginPage/LoginPage.tsx";
import SignUpPage from "./components/signUpPage/SignUpPage.tsx";
import UserInfoPage from "./components/userInfoPage/UserInfoPage.tsx";
import OfferPage from "./components/offerPage/OfferPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>,
    },
    {
        path: "add",
        element: <AddPage/>,
    },
    {
        path: "login",
        element: <LoginPage/>,
    },
    {
        path: "signup",
        element: <SignUpPage/>,
    },
    {
        path: "userinfo",
        element: <UserInfoPage/>,
    },
    {
        path:"offer",
        element: <OfferPage/>
    }
]);


function App() {
  return (
      <div>
          <RouterProvider router={router} />
      </div>
  )
}

export default App
