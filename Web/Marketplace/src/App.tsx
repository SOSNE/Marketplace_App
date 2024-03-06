import './App.css'
import MainPage from "./components/mainPage/MainPage.tsx";
import {
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import AddPage from "./components/addPage/AddPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>,
    },
    {
        path: "add",
        element: <AddPage/>,
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
