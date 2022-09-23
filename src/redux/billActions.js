import axios from 'axios';
let serverUri = process.env.SERVER_URI  ;

let token = window.localStorage.getItem('token');

export const createBill  = ({locations, car, datetime, grandTotal, image}) => async (dispatch) => {
    try {
        dispatch({"type": "createBillRequest"});
        
        let msg = await axios.post(serverUri + '/createbill', {locations: locations, car: car, datetime: datetime, grandtotal: grandTotal, image:image}, {
            headers:{
                'token': token,
                'Content-type':'application/json'
            }
        })
        dispatch({
            "type":"createBillSuccess",
            "msg": msg.data.msg,
        })
    } catch (error) {
        dispatch({
            "type":"createBillFailed",
            "err": error.response.data.msg
        })
    }
}

export const getBill = () => async(dispatch) => {
    try {
        let bill = await axios.get(serverUri + '/getbill', {
            headers:{
                'token': token,
                'Content-type':'application/json'
            }
        })
        dispatch({
            "type":"getBillSuccess",
            "bill": bill.data[0],
        })
    } catch (error) {
        dispatch({
            "type":"getBillFailed",
            "err": error.response.data.msg
        })
    }
}


export const cancelBooking = (id) => async(dispatch) => {
    try {
        let msg = await axios.delete(serverUri + `/cancelbill/${id}`, {
            headers:{
                'token': token,
                'Content-type':'application/json'
            }
        })
        dispatch({
            "type":"cancelBillSuccess",
            "msg": msg.data.msg,
        })
    } catch (error) {
        dispatch({
            "type":"cancelBillFailed",
            "err": error.response.data.msg
        })
    }
}