import jwt from 'jsonwebtoken'
let WT_SECRET = process.env.WT_SECRET || "ASd9yskhb328sdF934gnsd8f4b2kre2Rvrc2@#$vn7fsdf";


export default function AuthMiddleWare (req, res, next){
   let token = req.headers.token;
   if (token == null || token === '') res.status(404).json({'err':'Invalid Credintials please try logging in again'})
   else{
       jwt.verify(token, WT_SECRET, (err, suc) => {
        if(err) res.status(400).json({'err':'Invalid Credintials please try logging in again'})
        else{
            req.body.token = suc;
            next();
        }
       });
   }
}