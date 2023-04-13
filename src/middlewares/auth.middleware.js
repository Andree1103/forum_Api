const jwt = require('jsonwebtoken'); 

 const authenticate = (req,res,next) => {
    const token = req.headers['acces-token'];
    console.log(token);
    if(!token){
        next({
            status:401,
            error:"Unauthorized",
            message:"Not token provided"
        })
    }
    try {
        const decoded=jwt.verify(token,'jace',{algorithms: 'HS512'});
        req.user=decoded;
        next()
    } catch (error) {
        res.status(400).json(error)
    }
 }

 module.exports = authenticate