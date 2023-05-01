
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import LogoHome from './components/LogoHome'

function App() {

 

  return (
    <div className="App">
      <BrowserRouter>
      <LogoHome/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
