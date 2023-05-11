import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import Home from './pages/Home'
import LogoHome from './components/LogoHome'
import StepForm from './pages/forms/StepForm';
import Page404 from './pages/Page404';
import Steps from './pages/Steps';
import ToolForm from './pages/forms/ToolForm';
import * as endpoints from "../src/assets/endpoints"
import User from './models/User';

interface context {
  apiCalls: any;
  user : User;
}

export const appContext = createContext({} as context);


function App() {

 

  return (
    <appContext.Provider value={{
      apiCalls: endpoints,
      user: new User()
    }}>

    <div className="App">
      <BrowserRouter>
      <LogoHome/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pasos" element={<Steps />} />
          <Route path="/pasos/formulario" element={<StepForm />} />
          <Route path="/herramientas/formulario" element={<ToolForm />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
    </appContext.Provider>
  )
}

export default App
