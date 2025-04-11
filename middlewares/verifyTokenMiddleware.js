import  { validateToken }  from "../services/auth.js";

const  veryfyToken = async(req, res, next) =>{
  const userUid = req.cookies?.twc_uid;
  if (!userUid) {
    return res.json({
      message: "Access Denied ! ",
    });
  }
  const user = validateToken(userUid);
  if (!user) {
    return res.json({
      message: "Access Denied !",
    });
  }
  
  req.user = user;
  next();
}
export default veryfyToken
  
