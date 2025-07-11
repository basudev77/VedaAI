
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // ✅ attach user payload to req
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;
