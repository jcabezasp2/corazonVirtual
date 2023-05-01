import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

//theme
// import "primereact/resources/themes/lara-light-indigo/theme.css";    
import './css/reset.css';
import './css/LightTheme.css';  
    
//core
import "primereact/resources/primereact.min.css";
// import 'bootstrap/dist/css/bootstrap.css';


//icons
import "primeicons/primeicons.css";                                         
        

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
