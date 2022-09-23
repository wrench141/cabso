import '../App.css';
import {useState} from 'react';



export default function CarsSearch ({stack, state, setState}) {
    const [show, setShow] = useState(false)

    return(
        <>
            <div className='inputBox'>
                <input className='inp' placeholder='Select Brand' value={state} onChange={(e) => setState(e.target.value)}/>
                    <div className='box' onClick={() => setShow(!show)}>
                        <ion-icon name="chevron-down-outline" style={{fontSize: 15, color:'rgb(49, 49, 49)'}}></ion-icon>
                    </div>
            </div>
            {
                show ? (
                    <div className='dropMenu'>
                        {
                            stack.map((item) => (
                                <div className='carItem' onClick={() => {
                                    setState(item);
                                    setShow(false)
                                }}>
                                    {item}
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    )
}