const jwt = require('jsonwebtoken')

const roles = [
    'normal',
    'admin'
]

function restrict(role){
    return async (req, res, next) =>{
        const authErr = { message: 'You are not authorized!'}
        
    try{
        const token = req.cookies.token

        if(!token){
            return res.status(401).json(authErr)
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) =>{
            if(err){
                return res.status(401).json(authErr)
            }
            if (role && roles.indexOf(decoded.userRole) < roles.indexOf(role)) {
                return res.status(401).json(authErr)
        }
            next()
        })
        
    }catch(err){
        next(err)
        }
    }
}

module.exports = restrict