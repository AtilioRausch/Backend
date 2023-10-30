import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({  
  products: [{
    /* pid: {
        type: Number,
        required: true,        
    }, */    
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Products",
    },
    quantity: {
        type: Number  
    },
    _id: false     
  }]
});

export const cartsModel = mongoose.model("Carts", cartsSchema);
