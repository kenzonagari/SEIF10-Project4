const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (token == null){
        res.status(401).json({ msg: "Not Authorized!"});
    }

    try{
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({msg: "invalid token"});
    }

}

module.exports = authenticateToken;