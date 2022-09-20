import { useEffect, useState } from 'react'
import '../auth.css'
import { Link } from 'react-router-dom';
import { signupUser } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Signup () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errmsg, setErr] = useState('');
    const [showPass, setShowPass] = useState(true);
    const [details, setDetails] = useState('')

    const dispatch = useDispatch()

    const passCheck = (password) => {
        if(password.length > 5){
            setErr('');
            dispatch(signupUser({email, password}))

        }else{
            setErr('password must be 8 characters long');
        }
    }

    const {msg, err, token} = useSelector((state) => state.authReducer);
    useEffect(() => {
        if(msg != undefined){
            setDetails(msg);
        }else{
            setDetails(err);
        }
    }, [msg, err])

    return(
        <div className='registerContainer'>
            <div className='sec'>
                <div className='msg'>
                    {details}
                </div>
                <Link to='/'>
                    <div className='back'>
                        <ion-icon name="arrow-back-outline" style={{fontSize:30, color: 'rgb(128, 128, 128)'}}></ion-icon>
                    </div>
                </Link>
                <div className='innersection'>
                    <p className='head'>Register</p>
                    <p className='sub'>Hi there, a simple registration there ahead. Complete to get a cab. </p>
                    <div className='inputContainer'>
                        <label className='label'>Email</label>
                        <input className='inp' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='something@example.com'/>
                    </div>
                    <div className='inputContainer'>
                        <label className='label'>Password</label>
                        <div className='inputBox'>
                            <input className='inp' value={password} type={showPass ? 'password' : 'type'} onChange={(e) => setPassword(e.target.value)} placeholder='xxxxxxxxx'/>
                            <div className='icon' onClick={() => setShowPass(!showPass)}>  
                                {
                                    showPass ? (
                                        <ion-icon name="eye-outline" style={{fontSize:30, color: 'rgb(177, 177, 177)'}}></ion-icon>
                                    ) : (
                                        <ion-icon name="eye-off-outline" style={{fontSize:30, color: 'rgb(177, 177, 177)'}}></ion-icon>
                                    )
                                }
                            </div>
                        </div>
                        <p className='err'>{errmsg}</p>
                    </div>
                    <button onClick={() => passCheck(password)} className='btn'>REGISTER</button>

                    <a href='#' className='link'>
                        <span style={{color:'black'}}>Already having an account?</span> Try Login
                    </a>
                </div>
            </div>
            <div className='sec color'>
                
            </div>
        </div>
    )
}
{/* <p className='title'>
    Get your Taxi <span style={{color:'blueviolet'}}>FASTER</span>, <span style={{color:'blueviolet'}}>CHEAPER</span>, and <span style={{color:'blueviolet'}}>ANYWHERE</span> you like.
</p> */}