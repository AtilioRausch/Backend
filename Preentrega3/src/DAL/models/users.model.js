import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({  
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart:{     
      type: mongoose.SchemaTypes.ObjectId, 
      ref: "Carts",    
  },  
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER"
  },
});

export const usersModel = mongoose.model("Users", usersSchema);