import jwt from 'jsonwebtoken'

export const VerifiedUser = async(req,res,next) =>{
    try {
        const token =  req.cookies?.token;
    
        if(!token){
            return res.status(401).json({message:'user not logged in'});
        }
    
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        // console.log()
    
        req.user = decoded
        // console.log(req.user)

        next()
    } catch (error) {
        res.status(401).json({message:'user not logged in'});
    }
}