const authorizedRole = (...roles) => {
    console.log(roles)
    return (req, res, next) => {
        console.log(req.user.userType)
        if (!roles.includes(req.user.userType)) {
            return res.status(403).json({ massage: 'faild', data: '', error: "Access Denied!" })
        }
        next();
    }
}

export default authorizedRole