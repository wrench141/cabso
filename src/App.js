import './App.css';
import Navbar from './components/navbar';
import Map from './screens/map';
import Cars from './screens/cars';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Signup from './screens/signup';
import Login from './screens/login';
import Bills from './screens/bills';
import Notfound from './screens/404';

function App() {
  return (
    <Router>
      <Navbar />
      <StackContainer />
    </Router>
  );
}


const StackContainer = () => {
  let token = window.localStorage.getItem('token');
  let notToken = token == undefined;
  return(
      <Routes>
        <Route exact path='/' element={<Map />} />
        <Route path='/register' element={!notToken ? <Navigate to='/cabs' /> : <Signup />} />
        <Route path='/cabs' element={notToken ? <Navigate to='/register' /> : <Cars />} /> 
        <Route path='/booking' element={notToken ? <Navigate to='/register' /> : <Bills />} /> 
        <Route path='/login' element={!notToken ? <Navigate to='/cabs' /> : <Login />} /> 
        <Route path='*' element={<Notfound />}/>
      </Routes>
  )
}

export default App;
