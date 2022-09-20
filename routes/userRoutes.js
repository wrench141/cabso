import express from "express";
import { loginUser, signUpUser } from "../controller/userController.js";

const userRoutes = express.Router();


userRoutes.post('/signup', signUpUser);
userRoutes.post('/login', loginUser);

export default userRoutes


// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpZCIsImlhdCI6MTY2MzYwMDE5NH0.4gCHkPHm5hB9wuAdvGwvkxmAccFmhlSfiHMsweF2Flk",
//     "msg": "Registration Success"
//   }