import BillModel from "../models/billModel.js";


const createBill =  (req, res) => {
    const {locations, car, grandtotal, token, datetime} = req.body;
    try {

        BillModel.find({email : token.email}).then((bills) => {
            if(bills.length <= 0){
                let newBill = new BillModel();
                newBill.locations = locations;
                newBill.car = car;
                newBill.grandtotal = grandtotal;
                newBill.email = token.email;
                newBill.datetime = datetime;
                newBill.save();
                res.status(200).json({"msg": "Cab booking successfull, have a happy ride"});
            }else {
                res.status(400).json({"msg":"You have already booked a cab"})                
            }
        });
    } catch (error) {
        res.status(400).json({'msg': error})
    }
}


const getBill = (req, res) => {
    const {token} = req.body;
    try {
        BillModel.find({email : token.email}).then((bill) => {
            if(bill.length <= 0){
                res.status(404).json({"msg":"You haven't booked a cab"})                
            }else {
                res.status(200).json(bill);
            }
        });
    } catch (error) {
        res.status(400).json({'msg': error})
    }
}


const cancelBill = (req, res) => {
    const id = req.params.id;
    try {
        BillModel.findByIdAndDelete(id, () => {
            res.status(201).json({"msg":"Your booking has been canceled"})
        });
    } catch (error) {
        res.status(400).json({'msg': error})
    }
}

export {createBill, getBill, cancelBill}