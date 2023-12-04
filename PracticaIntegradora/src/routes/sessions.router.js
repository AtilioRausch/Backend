import {Router} from "express"
import passport from "passport"
import "../passport.js"
import { generateToken } from "../utils.js"


const router = Router();


router.post('/signup', passport.authenticate('signup'),(req, res) => {
    res.json({message: 'Signed up'})    
})

router.get('/current', passport.authenticate('jwt', {session: false}), async(req, res) => {
  res.status(200).json({message: 'User logged', user: req.user})  
})


router.get('/signout', async(req, res)=>{
  req.session.destroy(()=> {       
      res.redirect('/login')
  })
})


router.post('/login', passport.authenticate('login', {failureMessage: true, failureRedirect: "/login"}),(req, res) => {

    const {first_name, last_name, email, age, role, carts} = req.user    
    const token = generateToken({ first_name, last_name, email, age, role, carts})
    res.cookie('token', token, { maxAge: 60000, httpOnly: true })
    return res.redirect('/api/sessions/current')
}) 



export default router



