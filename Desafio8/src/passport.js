import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { usersModel } from "./db/models/users.model.js";
import { uManager } from "./dao/users.dao.js";
import { hashData, compareData } from "./utils.js";




passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, async(req, email, password, done)=>{  
  const {first_name, last_name, age, role} = req.body
  if (!first_name || !last_name || !age || !role || !email || !password){
      return done(null, false)
  }
  try{
      const hashedPassword = await hashData(password);
      const createdUser = await uManager.createUser({
        ...req.body,
        password: hashedPassword,
      });
      done(null, createdUser);
  }catch (error){
      done(error)
  }
}))



passport.use('login', new LocalStrategy({
  usernameField: 'email',
}, async(email, password, done)=>{
  if (!email || !password){      
      return done(null, false, {message: 'All fields are required'})
  }
  try{
      const user = await uManager.findUserByEmail(email)

      if(!user){
          return done(null, false, {message: 'You need to sign up first'})
      }
      const isPassValid = await compareData(password, user.password)
      if(!isPassValid){
          return done(null, false, {message: 'Incorrect username or password'})
      }      
      done(null, user)      
  }catch (error){
      done(error)
  }
}))



const fromCookies = (req) => {
  return req.cookies.token;
};


passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
      secretOrKey: "secretJWT",
    },
    async function (jwt_payload, done) {
      done(null, jwt_payload);
    }
  )
);




passport.serializeUser((user, done) => {
  // _id
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await uManager.findUserByID(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});