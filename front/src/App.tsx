import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, createContext, useEffect } from 'react';
import Home from './pages/Home';
import LogoHome from './components/LogoHome'
import StepForm from './pages/forms/StepForm';
import Page404 from './pages/Page404';
import Steps from './pages/Steps';
import Procedures from './pages/Procedures';
import ProcedureForm from './pages/forms/ProcedureForm';
import ToolForm from './pages/forms/ToolForm';
import Practices from './pages/Practices';
import Students from './pages/Students';
import Panel from './pages/Panel';
import Users from './pages/Users';
import Procedure from './pages/Procedure';
import * as endpoints from "../src/assets/endpoints"
import User from './models/User';
import Roles from './pages/Roles';
import Claims from './pages/Claims';
import Tools from './pages/Tools';
import Information from './pages/Information';
import { Role } from './assets/constants';
import './css/app.css';

interface context {
  apiCalls: any;
  user : User;
  changeUSer: (user: User) => void;
  logout: () => void;
}

export const appContext = createContext({} as context);

function App() {

  const [user, setUser] = useState<User>(new User());

  const changeUSer = (user: User) => {
    setUser(user);
  }

  const logout = () => {
    sessionStorage.removeItem('apiKey');
    setUser(new User());
  }

  useEffect(() => {
    if(sessionStorage.getItem('apiKey') != null && user.id == 0){
      endpoints.getMyUser().then((res: any) => {
        if(res == null){
          logout();
        }
        setUser(res);
      })
    }
  }, []);

  return (
    <appContext.Provider value={{
      apiCalls: endpoints,
      user: user,
      changeUSer: changeUSer,
      logout: logout
    }}>


    <div className="App">
      <BrowserRouter>
      <LogoHome/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pasos" element={user.role != Role.Guest? <Steps /> : <Home />} />
          <Route path="/pasos/formulario" element={user.role === Role.Teacher? <StepForm /> : <Home />} />
          <Route path="/pasos/formulario/:id" element={user.role === Role.Teacher? <StepForm /> : <Home />} />          
          <Route path="/procedimientos" element={user.role != Role.Guest? <Procedures /> : <Home />} />
          <Route path="/procedimientos/formulario" element={user.role == Role.Teacher?<ProcedureForm /> : <Home /> } />
          <Route path="/procedimientos/formulario/:id" element={user.role == Role.Teacher?<ProcedureForm /> : <Home /> } />
          <Route path="/procedimientos/:id" element={user.role == Role.Guest? <Home /> : <Procedure />} />
          <Route path="/practicas" element={user.role != Role.Guest? <Practices /> : <Home />} />
          <Route path="/estudiantes" element={user.role == Role.Teacher? <Students /> : <Home />} />
          <Route path="/herramientas" element={ <Tools />} />
          <Route path="/herramientas/formulario" element={user.role == Role.Teacher?<ToolForm /> : <Home /> } />
          <Route path="/herramientas/formulario/:id" element={user.role == Role.Teacher?<ToolForm /> : <Home /> } />
          <Route path="/panel" element={user.role == Role.Student || Role.Teacher? <Panel /> : <Home />} />
          <Route path="/admin/usuarios" element={user.role == Role.Admin? <Users /> : <Home />} />
          <Route path="/admin/roles" element={user.role == Role.Admin? <Roles /> : <Home />} />
          <Route path="/admin/permisos" element={user.role == Role.Admin? <Claims /> : <Home />} />
          <Route path="/informacion" element={<Information />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
    </appContext.Provider>
  )
}

export default App
