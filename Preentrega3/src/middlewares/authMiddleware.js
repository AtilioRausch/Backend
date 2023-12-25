export const authMiddleware = (roles) => { 
    return (req, res, next) => {
        const {user} = req
        console.log(user)
        if (!user){
            return res.status(401).json({ message: "no hay user unauthorized"})
        }
        if (roles && !roles.includes(user.role)) {
            return res.status(403).json({message: "Forbidden"})
        }
        next()
    }
}