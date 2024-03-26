import './App.css'
import MainPage from "./components/mainPage/MainPage.tsx";
import {
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import AddPage from "./components/addPage/AddPage.tsx";
import LoginPage from "./components/loginPage/LoginPage.tsx";
import SignIn from "./components/signInPage/SignIn.tsx";

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
        path: "signin",
        element: <SignIn/>,
    },
]);


function App() {
  return (
      <div>
          <RouterProvider router={router} />
      </div>
  )
}

export default App
