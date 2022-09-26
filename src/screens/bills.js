import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../bill.css";
import Notification from "../components/notification";
import { cancelBooking, getBill } from "../redux/billActions";

export default function Bills() {
  const [popup, setPopup] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBill());
  }, []);

  const { bill, cberr, cbmsg } = useSelector((state) => state.billReducer);

  let time, finalTime, date;
  if (bill !== undefined) {
    date = bill.datetime.date.split("T")[0];
    time = bill.datetime.time;
    let hr = parseInt(time.split(":")[0]);
    let min = parseInt(time.split(":")[1]);
    let estime = bill.datetime.estime;
    if (min + estime > 60) {
      min = min + estime - 60;
      hr += 1;
    } else {
      min = min + estime;
    }
    finalTime = hr + ":" + min;
  }

  return (
    <div className="billsContainer">
      {cbmsg !== undefined ? (
        <Notification msg={cbmsg} />
      ) : cberr !== undefined ? (
        <Notification msg={cberr} />
      ) : null}
      {bill !== undefined ? (
        <div className="section">
          <p className="head">Booking Details</p>
          <p className="subhead">Booking issued on {date}</p>
          <p className="time">
            Your Ride Timings {time}
            {bill.datetime.period} - {finalTime}
            {bill.datetime.period}
          </p>
          <div className="selections">
            <div className="lineContainer">
              <div className="circle" />
              <div className="line" />
              <div className="circle" />
            </div>
            <div className="center">
              <div className="placeContainer">
                <p className="place">{bill.locations.start}</p>
                <p className="place">{bill.locations.end}</p>
              </div>
            </div>
          </div>
          <p className="subhead">Bill Details</p>
          <p className="sub">
            You will find brief details about your booking below.
          </p>
          <div className="total">
            <div className="table">
              <div className="row bg">
                <div className="head">Description</div>
                <div className="head">Details</div>
              </div>
              <div className="row">
                <div className="sub">Passenger Email</div>
                <div className="sub">{bill.email}</div>
              </div>
              <div className="row">
                <div className="sub">Selected car</div>
                <div className="sub">{bill.car.name}</div>
              </div>
              <div className="row">
                <div className="sub">brand</div>
                <div className="sub">{bill.car.brand}</div>
              </div>
              <div className="row bg">
                <div className="sub">GrandTotal</div>
                <div className="sub">{bill.grandtotal}/-</div>
              </div>
            </div>
          </div>

          <button className="dbtn" onClick={() => setPopup(!popup)}>
            Cancel booking
          </button>
          {popup ? (
            <div className="popupBg">
              <div className="popup">
                <div className="circle">
                  <ion-icon name="alert-outline"></ion-icon>
                </div>
                <p className="phead">Cancel Booking</p>
                <p className="psub">
                  Are you sure to cancel your booking? click on confirm to
                  cancel booking.
                </p>
                <div className="buttonContainer">
                  <button
                    className="btn outline"
                    onClick={() => setPopup(!popup)}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      dispatch(cancelBooking(bill._id));
                      setPopup(!popup);
                      setTimeout(() => {
                        window.location.href = "/";
                      }, [4000]);
                    }}
                    className="btn"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="noneContainer">
          <p className="none">You have'nt booked a cab yet..</p>
          <Link to="/" className="btn">
            Book now
          </Link>
        </div>
      )}
    </div>
  );
}
