const jwt = require("jsonwebtoken");


const config = process.env;

const isAdmin = (req, res, next) => {
    const user = req.user;

    if (!user){
        res.statusCode = 500;
        res.send("Invalid User");
    } 

    else if(!user.role || user.role !== "ADMIN"){
        res.statusCode = 403;
        res.send("Unauthorized!!");
    } 

    next();
};


const isLoggedIn = (req, res, next) => {
    const token = req.headers["x-auth-token"];    
    try {
        if (!token) {
            res.statusCode = 401;
            res.send("A token is required for authentication");
        }else{

        // console.log('in verify')
            const decoded = jwt.verify(token, config.JWT_SECRET);

            req.user = decoded;
        }
        
    } catch (err) {
        // console.log('in catch')
        res.statusCode = 401;
        res.send("Invalid Token");
    }
    next();
};

module.exports = {
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin
};