import ratelimit from '../config/upstash.js'; 

const rateLimiter = async (req, res, next) =>{
    try{
        const {success} = await ratelimit.limit("my-limit-key");
        console.log(success);
        if(!success){
            return res.status(429).json({message: 'Too many requests, please try again later'});
        }
        next();
    }
    catch(error){
        console.error("Error in rate limiter middleware:", error);
        res.status(500).json({message: 'Internal Server Error'});   
        next(error);
    }
}

export default rateLimiter;