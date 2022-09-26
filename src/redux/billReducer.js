import { createReducer } from "@reduxjs/toolkit";

const BillReducer = createReducer(
  {},
  {
    createBillRequest: (state) => {
      state.loading = true;
    },
    createBillSuccess: (state, action) => {
      state.loading = false;
      state.msg = action.msg;
    },
    createBillFailed: (state, action) => {
      state.loading = false;
      state.err = action.err;
    },

    getBillSuccess: (state, action) => {
      state.loading = false;
      state.bill = action.bill;
    },
    getBillFailed: (state, action) => {
      state.loading = false;
      state.berr = action.err;
    },

    cancelBillSuccess: (state, action) => {
      state.loading = false;
      state.cbmsg = action.msg;
    },
    cancelBillFailed: (state, action) => {
      state.loading = false;
      state.cberr = action.err;
    },
  }
);

export { BillReducer };
