import express from "express";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import cookieRouter from "./routes/cookie.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js"
import session from "express-session";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import MongoStore from 'connect-mongo'
/* import flash from 'express-flash'; */
import passport from "passport";
import config from "./config.js"
const URI = config.mongo_uri
const PORT = config.port

//DB
import "./db/configDB.js";
import "./passport.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
//cookies
app.use(cookieParser("SecretCookie"));



// sessions
app.use(
  session({
    store: new MongoStore({
      mongoUrl: URI,
    }),
    secret: "secretSession",
    cookie: { maxAge: 60000 },
  })
);


//passport
/* app.use(flash()); */
app.use(passport.initialize());
app.use(passport.session());




// handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// routes
app.use("/", viewsRouter);
/* app.use("/api/cookie", cookieRouter); */
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);
app.use("/api/users", usersRouter)







app.listen(PORT, () => {
  console.log("Escuchando al puerto 8080");
});