import express from "express";
import { cancelBill, createBill, getBill } from "../controller/billController.js";
import { loginUser, signUpUser } from "../controller/userController.js";
import AuthMiddleWare from '../middleware/authMiddleware.js';

const userRoutes = express.Router();


userRoutes.post('/signup', signUpUser);
userRoutes.post('/login', loginUser);

userRoutes.post('/createbill', AuthMiddleWare, createBill);
userRoutes.get('/getbill', AuthMiddleWare, getBill);
userRoutes.delete('/cancelbill/:id', AuthMiddleWare, cancelBill);

export default userRoutes


// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpZCIsImlhdCI6MTY2MzYwMDE5NH0.4gCHkPHm5hB9wuAdvGwvkxmAccFmhlSfiHMsweF2Flk",
//     "msg": "Registration Success"
//   }