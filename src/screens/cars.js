import "../App.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import allCars, { brands, types } from "../components/cars";
import CarsSearch from "../components/carsSearch";
import Car from "../components/car";
import RightBar from "../components/rightBar";

export default function Cars() {
  const [brand, setBrand] = useState("All Cars");
  const [type, setType] = useState("All");
  const [filteredCars, setFilteredCars] = useState([]);

  const [showBar, setShowBar] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");

  const { totalDistance, markerDetails, totalTime, pricePerKm } = useSelector(
    (state) => state.mapReducer
  );

  let estTime, label;
  if (totalTime > 60) {
    estTime = totalTime / 60;
    label = "hrs";
  } else {
    estTime = totalTime;
    label = "mins";
  }

  let EstimatedPrice = (totalDistance * pricePerKm).toFixed(1);

  const filterCars = (brand, type) => {
    if (brand === "All Cars" && type !== "All") {
      setFilteredCars(allCars.filter((car) => car.type === type));
    } else if (brand !== "All Cars" && type === "All") {
      setFilteredCars(allCars.filter((car) => car.brand === brand));
    } else if (brand === "All Cars" && type === "All") {
      setFilteredCars(allCars);
    } else {
      setFilteredCars(
        allCars.filter((car) => car.brand === brand && car.type === type)
      );
    }
  };

  useEffect(() => {
    filterCars(brand, type);
  }, [brand, type]);

  return (
    <div className="carsContainer">
      <div className="topbar">
        <div className="inputContainer">
          <CarsSearch stack={brands} state={brand} setState={setBrand} />
        </div>
        <div className="inputContainer">
          <CarsSearch stack={types} state={type} setState={setType} />
        </div>
      </div>
      <div className="container">
        {filteredCars.map((car, i) => (
          <Car
            details={car}
            key={i}
            setState={setShowBar}
            setSelectedBrand={setSelectedBrand}
          />
        ))}
      </div>
      {markerDetails !== undefined ? (
        <div className="info">
          <div className="address">
            <div className="card">
              <p className="place">{markerDetails[0].result.p1}</p>
              <p className="sub">{markerDetails[0].result.p2}</p>
            </div>
            <p className="mid">to</p>
            <div className="card">
              <p className="place">{markerDetails[1].result.p1}</p>
              <p className="sub">{markerDetails[1].result.p2}</p>
            </div>
          </div>
          <div className="extraDetails">
            <div className="extra">
              <p className="value">
                {totalDistance}{" "}
                <span style={{ fontSize: 11, fontWeight: 400 }}>Km</span>{" "}
              </p>
              <p className="subHead">Total Distance</p>
            </div>
            <div className="extra">
              <p className="value">
                {pricePerKm}{" "}
                <span style={{ fontSize: 11, fontWeight: 400 }}>/-</span>{" "}
              </p>
              <p className="subHead">per Km</p>
            </div>
            <div className="extra">
              <p className="value">
                {EstimatedPrice}{" "}
                <span style={{ fontSize: 11, fontWeight: 400 }}>/-</span>{" "}
              </p>
              <p className="subHead">Average Price</p>
            </div>
            <div className="extra">
              <p className="value">
                {estTime.toFixed(2)}{" "}
                <span style={{ fontSize: 11, fontWeight: 400 }}>{label}</span>{" "}
              </p>
              <p className="subHead">Estimated Time</p>
            </div>
          </div>
        </div>
      ) : null}
      {showBar ? (
        <RightBar
          state={showBar}
          setState={setShowBar}
          brand={selectedBrand}
          estimatedPrice={EstimatedPrice}
        />
      ) : null}
    </div>
  );
}
