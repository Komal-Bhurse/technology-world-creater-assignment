const authorizedRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.userType)) {
            return res.status(403).json({ massage: 'faild', data: '', error: "You are unauthorised!" })
        }
        next();
    }
}

export default authorizedRole