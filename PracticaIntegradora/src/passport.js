import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
/* import { Strategy as GithubStrategy } from "passport-github2";
 */
import { uManager } from "./dao/managersMongo/usersManager.js";
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

/* // github
passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: "98703947592e6041e3e8",
      clientSecret: "760d8328f42f1c0b4e19a7c799bbcf89e4cf460c",
      callbackURL: "http://localhost:8080/api/sessions/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userDB = await uManager.findUserByEmail(profile._json.email);

        if (userDB) {
          if (userDB.isGithub) {
            return done(null, userDB);
          } else {
            return done(null, false);
          }
        }
        // signup
        const infoUser = {
          first_name: profile._json.name.split(" ")[0], // ['farid','sesin']
          last_name: profile._json.name.split(" ")[1],
          email: profile._json.email,
          password: " ",
          isGithub: true,
        };
        const createdUser = await uManager.createUser(infoUser);
        done(null, createdUser);
      } catch (error) {
        done(error);
      }
    }
  )
); */

passport.serializeUser((user, done) => {
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