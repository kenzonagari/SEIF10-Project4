const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null){
        res.status(401).json({ msg: "Not Authorized!" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if (err) {
            res.status(403).json({ msg: "Token invalid!" });
        }
        req.user = user;
        next();
    });
}