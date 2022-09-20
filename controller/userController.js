import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

let WT_SECRET = process.env.WT_SECRET || "ASd9yskhb328sdF934gnsd8f4b2kre2Rvrc2@#$vn7fsdf";

export const signUpUser = (req, res) => {
    const {email, password} = req.body;


    userModel.findOne({email}).then(async(user) => {
        if(user == null){
            let hash = await bcrypt.hash(password, 10);
            let newUser = new userModel({
                email:email,
                password: hash
            });
            newUser.save();
            let signed = jwt.sign({email: email}, WT_SECRET);
            res.json({
                "token": signed,
                "msg": "Registration Success"
            });
        }else{
            res.json({'err' : 'A user with this email already exists'})
        }
    })
}

export const loginUser = (req, res) => {
    const {email, password} = req.body;
    
    userModel.findOne({email}).then(async(user) => {
        if(user != null){
            let pass = await bcrypt.compare(password, user.password);
            if(pass){
                let signed = jwt.sign({email: email}, WT_SECRET);
                res.json({
                    "token": signed,
                    'msg': 'Login Successfull'})
            }else{
                res.json({'err': 'Invalid Credintials'})
            }
        }else{
            res.json({'err' : 'user doesn\'t exists try signing up'})
        }
    })
}