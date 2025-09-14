import HomePage from './components/HomePage'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import GenPropile from './components/GenPropile';
function App() {

  return (
    <>
    <ToastContainer /> 
    <h1>Infinty Scroll Page!</h1>
    <GenPropile />
    <HomePage /> 

    </>
  )
}

export default App
