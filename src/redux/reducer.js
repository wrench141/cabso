import { createReducer } from "@reduxjs/toolkit";

const mapReducer = createReducer(
  {},
  {
    getMarkers: (state, action) => {
      state.allMarkers = action.markers;
      state.markerDetails = action.details;
    },
    getDistance: (state, action) => {
      state.totalDistance = action.tDistance;
      state.totalTime = action.totalTime;
      state.pricePerKm = action.pricePerKm;
    },
  }
);

const authReducer = createReducer(
  {},
  {
    signupRequest: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.msg = action.msg;
      state.isAuthenticated = true;
    },
    signupFailed: (state, action) => {
      state.loading = false;
      state.err = action.err;
      state.isAuthenticated = false;
    },
    signinRequest: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.msg = action.msg;
      state.isAuthenticated = true;
    },
    signinFailed: (state, action) => {
      state.loading = false;
      state.err = action.err;
      state.isAuthenticated = false;
    },
  }
);

export default mapReducer;
export { authReducer };
