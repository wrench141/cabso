import axios from "axios";

var markers = [];
var markerDetails = [];
let distance;
let totalTime;
let pricePerKm = 4;

let serverUri = process.env.SERVER_URI;

//map actions

export const getAllMarkers = (marker, result, type) => async (dispatch) => {
  if (markers.length < 2) {
    markers = [...markers, { marker: marker, type: type }];
    markerDetails = [...markerDetails, { result: result, type: type }];
  } else {
    let removeableMarkers = markers.filter((obj) => obj.type == type);
    removeableMarkers.map((mar) => {
      mar.marker.remove();
    });

    markers = markers.filter((obj) => obj.type != type);
    markerDetails = markerDetails.filter((obj) => obj.type != type);
    markers = [...markers, { marker: marker, type: type }];
    markerDetails = [...markerDetails, { result: result, type: type }];
  }

  console.log(markers);
  dispatch({
    type: "getMarkers",
    markers: markers,
    details: markerDetails,
  });
};

export const storeDistanceTime = (totalDis, time) => async (dispatch) => {
  distance = totalDis;
  totalTime = time;
  dispatch({
    type: "getDistance",
    tDistance: distance,
    totalTime: totalTime,
    pricePerKm: pricePerKm,
  });
};

export const removeAllMarkers = () => async (dispatch) => {
  markers = [];
  markerDetails = [];
};

//user actions

export const signupUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "signupRequest" });

      let msg = await axios.post(
        serverUri + "/signup",
        { email: email, password: password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (msg.data.token != undefined) {
        window.localStorage.setItem("token", msg.data.token);
        dispatch({
          type: "signupSuccess",
          msg: msg.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: "signupFailed",
        err: error.response.data.err,
      });
    }
  };

export const signinUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "signinRequest" });

      let msg = await axios.post(
        serverUri + "/login",
        { email: email, password: password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (msg.data.token != undefined) {
        window.localStorage.setItem("token", msg.data.token);
        dispatch({
          type: "signinSuccess",
          msg: msg.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: "signinFailed",
        err: error.response.data.err,
      });
    }
  };
