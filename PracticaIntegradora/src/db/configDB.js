import mongoose from "mongoose";

/* const URI =
  "mongodb+srv://coderhouse:coderhouse@cluster0.sugvijj.mongodb.net/DB47315PI?retryWrites=true&w=majority"; */
const URI = 
"mongodb+srv://atiliorau:NYtEUvEfZTUMxCuR@cluster0.1q0tid2.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la DB"))
  .catch((error) => console.log(error));