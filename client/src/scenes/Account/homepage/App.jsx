import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn'
import Home from './components/Home'
import SignUp from './components/SignUp';
import About from './components/AboutUs/About';


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
          
        
        </Routes>
      </div>
    </Router>
  

  
   
 </>

  )
}

export default App
