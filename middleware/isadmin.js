const user = require("../model/user");

module.exports.isAdmin = (req, res, next) => {
    if (req.body.role === "Client") {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};

module.exports.isClient = (req, res, next) => {
    if (req.body.role === "Admin") {
        return res.status(403).json({
            error: 'Client resourse! Access denied'
        });
    }
    next();
};