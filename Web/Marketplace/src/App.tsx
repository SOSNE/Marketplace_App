import './App.css'
import TopBar from "./components/mainPage/TopBar.tsx";

const colorList = {
    '--Main': "#FFC8DD",
    '--Sec': "#FFAFCC",
    '--Blue': "#A2D2FF",
    '--LightBlue': "#BDE0FE",
    '--BackGround': "#CDB4DB",
}

//Setting colors from Colors.ts to css.
const root:HTMLElement | null = document.querySelector(':root');
if(root)
{
    for (const [virable,value] of Object.entries(colorList))
    {
        root.style.setProperty(virable, value);
    }
}

function App() {
  return (
      <div>
        <TopBar/>
      </div>
  )
}

export default App
