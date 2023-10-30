import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import { messagesManager } from "./dao/mongoDB/messageManager.js";

//DB
import "./db/configDB.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


// handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// routes

app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => {
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