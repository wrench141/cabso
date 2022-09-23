import { useRef, useState } from "react";
import '../App.css';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getAllMarkers } from "../redux/actions";

const APIKEY = process.env.APIKEY || '9iplJFWN7wvWzNXKk1fnWLFdeFFAM4Pp';

export default function Search ({placeholder, map, type}){


    const [start, setStart] = useState('');
    const dropBox = useRef();

    const getSearchResults = (e, setState, state) => {
        e.preventDefault();
        setState(e.target.value);
        if(e.target.value != ""){
            dropBox.current.style.display = "block";
        }else{
            dropBox.current.style.display = "none";
        }
        if(state.length < 3) return;
        const searchUri = `https://api.tomtom.com/search/2/search/${e.target.value}.json?key=${APIKEY}`;

        axios.get(searchUri).then((res) => {
            let results = res.data.results.map((loc) => {
                let parts = loc.address.freeformAddress.split(',');
                return {
                    p1: parts.length > 0 ? parts[0] : '',
                    p2: parts.length > 1 ? parts[1] : '',
                    p3: parts.length > 2 ? parts[2] : '',
                    address: loc.address.freeformAddress,
                    lat: loc.position.lat,
                    lon: loc.position.lon
                }
            });
            if(results.length > 0){
                dropBox.current.replaceChildren();
                results.map((result) => {
                    const dropItem = document.createElement('div');
                    const place = document.createElement('p');
                    const sec = document.createElement('p');
                    dropItem.classList.add('location');
                    place.classList.add('place');
                    sec.classList.add('sec');
                    place.textContent = result.p1;
                    sec.textContent = result.p2;
                    dropItem.appendChild(place);
                    dropItem.appendChild(sec);
                    dropItem.addEventListener('click', () => {
                        setStart(result.p1);
                        markPoint({lat: result.lat, lon: result.lon, result});
                    })
                    dropBox.current.appendChild(dropItem);
                })
            }
        })
    }

    const locateMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => getCurrentLocation(position), errLoc, {
                enableHighAccuracy: true
            });
        }
    }
    const getCurrentLocation = (position) => {
        const searchUri = `https://api.tomtom.com/search/2/search/${position.coords.latitude},${position.coords.longitude}.json?key=${APIKEY}`;
        axios.get(searchUri).then((res) => {
            let parts = res.data.results[0].address.freeformAddress.split(',');
            let result = {
                    p1: parts.length > 0 ? parts[0] : '',
                    p2: parts.length > 1 ? parts[1] : '',
                    p3: parts.length > 2 ? parts[2] : '',
                    address: res.data.results[0].address.freeformAddress,
                    lat: res.data.results[0].position.lat,
                    lon: res.data.results[0].position.lon}
            setStart(result.p1);
            map.setCenter({lat: position.coords.latitude, lon: position.coords.longitude});
            map.setZoom(15);
            let marker = new tt.Marker().setLngLat({lat:position.coords.latitude, lon: position.coords.longitude}).addTo(map);
            dispatch(getAllMarkers(marker, result, type="start"));
        });
        
    }
    
    const errLoc = () => null;



    const dispatch = useDispatch();

    const markPoint = ({lat, lon, result}) => {
        dropBox.current.style.display = "none";
        map.setCenter({lat, lon});
        map.setZoom(15);
        let marker = new tt.Marker().setLngLat({lat, lon}).addTo(map);
        dispatch(getAllMarkers(marker, result, type));
    } 
    return(
        <div className='inputBox'>
            <input className='inp' value={start} onChange={e => getSearchResults(e, setStart, start)} placeholder={placeholder}/>
            <div className='dropdown' ref={dropBox}></div>
            {
                placeholder === 'Pickup point' ? (
                    <div className="autoLocation" >
                        <input type="checkbox" id="check" className="default"/>
                        <div className="checkbox">
                            <ion-icon name="locate-outline" style={{color:'white', fontSize:10}}></ion-icon>
                        </div>
                        <label className="label" for="check" onClick={() => locateMe()}>Auto Locate</label>
                    </div>
                ) : null
            }
        </div>
    )
}