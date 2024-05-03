
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    //Removed React StrictMode because it renders components twice on dev server
    <App />
)
