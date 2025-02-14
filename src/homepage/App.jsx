import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn'
import Home from './components/Home'
import SignUp from './components/SignUp';
import About from './components/AboutUs/About';
import HowItWorks from './components/HowItWorks';

function App() {

  return (
    <>
<Router>
      
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/aboutus' element={<About />} />
          <Route path='/howitworks' element={<HowItWorks />} />
        
        </Routes>
      </div>
    </Router>
  

  
   
 </>

  )
}

export default App
