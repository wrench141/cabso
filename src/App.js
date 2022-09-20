import './App.css';
import Navbar from './components/navbar';
import Map from './screens/map';
import Cars from './screens/cars';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Signup from './screens/signup';
import { useSelector } from 'react-redux';

function App() {
  return (
    <Router>
      <Navbar />
      <StackContainer />
    </Router>
  );
}


const StackContainer = () => {
  const {isAuthenticated} = useSelector((state) => state.authReducer);
  console.log(isAuthenticated)
  return(
      <Routes>
        <Route exact path='/' element={<Map />} />
        <Route path='/cabs' element={isAuthenticated ? <Cars /> : <Navigate to='/register' />} /> 
        <Route path='/register' element={!isAuthenticated ? <Signup /> : <Navigate to='/' />}/>
      </Routes>
  )
}

export default App;
