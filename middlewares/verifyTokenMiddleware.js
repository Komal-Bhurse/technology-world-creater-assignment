import  { validateToken }  from "../services/auth.js";

const  veryfyToken = async(req, res, next) =>{
  const userUid = req.cookies?.uuid;
  if (!userUid) {
    return res.json({
      massage: "Access Denied ! ",
    });
  }
  const user = validateToken(userUid);
  if (!user) {
    return res.json({
      massage: "Access Denied !",
    });
  }
  
  req.user = user;
  next();
}
export default veryfyToken
  
