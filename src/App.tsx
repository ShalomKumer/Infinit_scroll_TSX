import HomePage from './components/HomePage'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import { SocialIcon } from 'react-social-icons'
function App() {

  return (
    <>
    <ToastContainer /> 
    <h1 style={{

    }}>Instagram <SocialIcon network="Instagram" style={{ height: 25, width: 25 }} /></h1>
    <HomePage /> 
    
    </>
  )
}

export default App
