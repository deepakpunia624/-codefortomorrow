const jwt = require("jsonwebtoken")

module.exports ={
    userAuthentication: async (req,res,next)=>{
        const authHeader = req.headers.authorization || req.headers.Authorication;
        if(authHeader && authHeader.startsWith("Bearer")){
            let token  = authHeader.split(' ')[1];
            jwt.verify(token, "hdgfsdg",(err,decoded)=>{
                if(err){
                    res.status(401).json({
                        success: false,
                        message:"You are not authorized"
                    })
                }else{
                    req.user = decoded.userData
                    next()
                }
            })
        }else{
            res.status(409).json({
                success:false,
                message:"Token not found"
            })
        }
    }
}