import mongoose from "mongoose";

const billSchema = mongoose.Schema({
    locations:{
        start: {
            'type': String,
            'required': true
        },
        end: {
            'type': String,
            'required': true
        }
    },
    car:{
        name: {
            'type': String,
            'required': true
        },
        brand: {
            'type': String,
            'required': true
        },
    },
    datetime:{
        date:{
            "type": Date,
            'required':true
        },
        time:{
            "type": String,
            'required': true
        },
        period:{
            "type": String,
            'required': true
        },
        estime:{
            'type': Number,
            'required': true
        }
    },
    grandtotal:{
        'type': Number,
        'required': true
    },
    email:{
        'type': String,
        'required': true
    },

})


const BillModel = mongoose.model("BillModel", billSchema);
export default BillModel;