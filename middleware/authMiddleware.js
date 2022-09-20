import jwt from 'jsonwebtoken'
let WT_SECRET = process.env.WT_SECRET || "ASd9yskhb328sdF934gnsd8f4b2kre2Rvrc2@#$vn7fsdf";


export default function AuthMiddleWare (req, res, next){
   let token = req.headers.token;
   if (token == null || token === '') res.json({'err':'Invalid Credintials please try logging in again'})
   else{
       jwt.verify(token, WT_SECRET, (err, suc) => {
        if(err) res.json({'err':'Invalid Credintials please try logging in again'})
        else{
            console.log(suc)
            req.body = suc;
            next();
        }
       });
   }
}