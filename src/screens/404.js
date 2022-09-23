import { Link } from 'react-router-dom';
import '../App.css';


export default function Notfound (){
    return(
        <div className='pageContainer'>
            <p className='num'>404</p>
            <p className='sub'>The page you are looking for is Not Found</p>
            <Link className='btn' to='/' data-state={true} >Home</Link>
        </div>
    )
}