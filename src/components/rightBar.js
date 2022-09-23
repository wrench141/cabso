import '../App.css'
import allCars from './cars'
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBill } from '../redux/billActions';
import Notification from './notification';

export default function RightBar ({state, setState, brand, estimatedPrice}) {
    const details = allCars.filter((car) => car.model === brand);

    const [date, setDate]= useState('');

    const [hrs, setHrs] = useState();
    const [mins, setMins] = useState();
    const [period, setPeriod] = useState('AM');

    const nightCharges = period === "PM" && hrs > 6 ? details[0].charges + 2 : 0;
    let grandTotal = parseFloat(estimatedPrice) + details[0].charges + nightCharges;


    const InputRef = useRef();



    const getCurrentDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + ' / ' + dd + ' / ' + yyyy;
        setDate(today)
    }

    const dispatch = useDispatch();
    const {markerDetails, totalTime} = useSelector((state) => state.mapReducer);
    console.log(totalTime)
    
    const createBillHanler = () => {
        let time = hrs + ':' + mins;
        let locations = { 
            start : markerDetails[0].result.p1,
            end : markerDetails[1].result.p1
        }
        let car = {
            name : details[0].model,
            brand : details[0].brand,
        }
        let datetime = { 
            date : date,
            time : time,
            period : period,
            estime : Math.ceil(totalTime)
        }
        
        dispatch(createBill({locations, car, datetime, grandTotal}));
    }
    const {msg, loading} = useSelector((state) => state.billReducer);


    return(
        <div className='barContainer'>
            {
                msg !== undefined ? (
                    <Notification msg={msg} />
                ) : null
            }
            <div className='close' onClick={() => setState(!state)}>
            <ion-icon name="close-outline" style={{fontSize:30}}></ion-icon>
            </div>
            <div className='rightbar'>
                <p className='head'>{details[0].model}</p>
                <p className='sub'>{details[0].brand}</p>
                <div className='tags'>
                    <div className='tag'>{details[0].type}</div>
                    <div className='tag'>seats: {details[0].seats}</div>
                    <div className='tag'>{details[0].fuel}</div>
                </div>
                <div className='selections'>
                    <div className='lineContainer'>
                        <div className='circle' />
                        <div className='line' />
                        <div className='circle' />
                    </div>
                    <div className='center'>
                        <div className='placeContainer'>
                            <p className='place'>{markerDetails[0].result.p1}</p>
                            <p className='place'>{markerDetails[1].result.p1}</p>
                        </div>
                    </div>
                </div>
                <div className='inputSection'>
                    <div className='timeContainer'>
                        <input className='inpt' type="text" placeholder="Select pickup date" ref={InputRef} onFocus={() => {
                            InputRef.current.type = "date"
                        }} onBlur={() => {
                            InputRef.current.type = "text"
                        }} value={date} onChange={(e) => setDate(e.target.value)} />
                        <div className='current'>
                            <input className='checkbox' id='checkbox' type='checkbox' />
                            <div className='box'>
                                <ion-icon name="checkmark-outline" style={{color:'white', fontSize:11}}></ion-icon>
                            </div>
                            <label className='label' onClick={() => getCurrentDate()} for="checkbox" >Use Current Date</label>
                        </div>
                    </div>
                    <div className='timeContainer'>
                        <div className='row'>
                            <div className='dateSelector'>
                                <p className='label2'>Pickup Time</p> 
                                <input className='sec' value={hrs} onChange={(e) => setHrs(e.target.value)} />
                                <p className='colon'>:</p>
                                <input className='sec' value={mins} onChange={(e) => setMins(e.target.value)}/>
                            </div>
                            <div className='Tsec'>
                                <div className='item' onClick={() => setPeriod('AM')}>AM</div>
                                <div className='item' onClick={() => setPeriod('PM')}>PM</div>
                            </div>
                        </div>
                        <p className='label'>Estimated Time to reach: 23:23</p>
                    </div>
                    <div className='total'>
                        <p className='label'>Confirm Details</p>
                        <div className='table'>
                            <div className='row bg'>
                                <div className='head'>
                                    Description
                                </div>
                                <div className='head'>
                                    Price
                                </div>
                            </div>
                            <div className='row'>
                                <div className='sub'>
                                    SubTotal
                                </div>
                                <div className='sub'>
                                {estimatedPrice}/-
                                </div>
                            </div>
                            <div className='row'>
                                <div className='sub'>
                                    Car Charges
                                </div>
                                <div className='sub'>
                                    {details[0].charges}/-
                                </div>
                            </div>
                            {
                                period === "PM" && hrs > 6 ? (
                                    <div className='row'>
                                        <div className='sub'>
                                            Extra Charges
                                        </div>
                                        <div className='sub'>
                                        {nightCharges}/-
                                        </div>
                                    </div>
                                ):null
                            }
                            <div className='row bg'>
                                <div className='sub'>
                                    GrandTotal
                                </div>
                                <div className='sub'>
                                    {grandTotal}/-
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => createBillHanler()} style={msg !== undefined ? {backgroundColor: "#6de22b"} : null } className='btn'>
                            {
                                loading ? (
                                    <div className='loading' /> 
                                ) : msg !== undefined ? "Success" : "Confirm Booking"
                            }
                    </button>
                </div>
            </div>
        </div>
    )
}
