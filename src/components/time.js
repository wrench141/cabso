import { useRef } from 'react'
import '../App.css'

export default function Time({placeholder, type}){
    const InputRef = useRef();
    return(
        <div className='timeContainer'>
            <input className='inpt' type="text" placeholder={placeholder} ref={InputRef} onFocus={() => {
                InputRef.current.type = type
            }} onBlur={() => {
                InputRef.current.type = "text"
            }} />
            <div className='current'>
                <input className='checkbox' id='checkbox' type='checkbox' />
                <div className='box'>
                    <ion-icon name="checkmark-outline" style={{color:'white', fontSize:11}}></ion-icon>
                </div>
                <label className='label' for="checkbox" >Use Current Date</label>
            </div>
        </div>
    )
}