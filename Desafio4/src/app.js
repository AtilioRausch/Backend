import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import { manager } from "./prodManager.js";

import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


/* -----------------------------------------------------------------*/
/* ROUTES */

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter);



/* -----------------------------------------------------------------*/

const httpServer = app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

const socketServer = new Server(httpServer);


const allProducts= await manager.getProducts();

  socketServer.on(`connection`, (socket) => {
    
  console.log(`cliente conectado: ${socket.id}`);
  
  socket.emit(`productosInicial`,allProducts)



  socket.on('addProduct', async(product)=>{

    const producto= await manager.addProduct(product);
    const productosActualizados = await manager.getProducts();
    socket.emit('productUpdate', productosActualizados)   

  })

  socket.on('deleteProduct', async(id)=> {
    const producto= await manager.deleteProductById(id);
    const productosActualizados = await manager.getProducts();
    socket.emit('productUpdate', productosActualizados)   
  })
});