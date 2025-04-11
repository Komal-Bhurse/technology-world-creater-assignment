const authorizedRole = (...roles) => {
    console.log(roles)
    return (req, res, next) => {
        // console.log(req.user.userType)
        if (!roles.includes(req.user.userType)) {
            return res.status(403).json({ message: 'faild', data: req.user, error: "Access Denied!" })
        }
        // console.log(req.user.userType)
        next();
    }
}

export default authorizedRole