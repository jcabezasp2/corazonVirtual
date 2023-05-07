import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import LogoHome from './components/LogoHome'
import StepForm from './pages/forms/StepForm';
import Page404 from './pages/Page404';


function App() {

 

  return (
    <div className="App">
      <BrowserRouter>
      <LogoHome/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pasos/formulario" element={<StepForm />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
