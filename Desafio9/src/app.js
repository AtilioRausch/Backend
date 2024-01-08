import express from "express";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";import { Server } from "socket.io";
import { messagesManager } from "./DAL/dao/messageManager.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import cookieRouter from "./routes/cookie.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js"
import session from "express-session";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import MongoStore from 'connect-mongo'
import passport from "passport";
import config from "./config/config.js"
/* import {generateProduct} from './faker.js' */
import { errorMiddleware } from './middlewares/error.middleware.js';
const URI = config.mongo_uri
const PORT = config.port

//DB
import "./config/configDB.js";
import "./passport.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
//cookies
app.use(cookieParser("SecretCookie"));


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

app.use(errorMiddleware)


const httpServer = app.listen(PORT, () => {
  console.log("Escuchando al puerto 8080");
});


const socketServer = new Server(httpServer);
/* const messages = []; */
socketServer.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);
  socket.on("newUser", (user) => {
    socket.broadcast.emit("userConnected", user);
    socket.emit("connected");
  });
  socket.on("message", async(infoMessage) => {
    await messagesManager.createOne(infoMessage);
    const allMessages = await messagesManager.findAll()
    socketServer.emit("chat", allMessages);
  });
});