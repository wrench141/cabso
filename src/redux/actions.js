import axios from 'axios'

var markers = [];
var markerDetails = [];
let distance;
let totalTime;
let pricePerKm = 2;

let serverUri = 'http://127.0.0.1:4000'

export const getAllMarkers = (marker, result) => async(dispatch) => {
    markers = [...markers, marker];
    markerDetails = [...markerDetails, result];
    dispatch({
        type : "getMarkers",
        markers : markers,
        details: markerDetails
    })
}

export const storeDistanceTime = (totalDis, time) => async(dispatch) => {
    distance = totalDis;
    totalTime = time;
    dispatch({
        type : "getDistance",
        tDistance: distance,
        totalTime: totalTime,
        pricePerKm: pricePerKm
    })
}


export const signupUser = ({email, password}) => async(dispatch) => {
    try {
        dispatch({"type": "signupRequest"});
        
        let msg = await axios.post(serverUri + '/signup', {email: email, password : password}, {
            headers:{
                'Content-type':'application/json'
            }
        })
        let response = msg.data.msg ? msg.data.msg : msg.data.err
        dispatch({
            "type":"signupSuccess",
            "msg": response,
            "token": msg.data.token
        })

    } catch (error) {
        dispatch({
            "type":"signupFailed",
            "err": error
        })
    }
} 