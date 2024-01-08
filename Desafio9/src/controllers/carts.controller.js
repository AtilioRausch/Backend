/* import { createNewCart, findCartById, addProduct, deleteOneFromCart, updateAllProducts, updateQuantity, deleteAllProductsInCart } from "../services/carts.service.js"; */
import { cartsService } from "../repositoryServices/index.js";
import mongoose from "mongoose";
import CustomError from "../errors/error.generator.js";
import { ErrorMessages, ErrorName } from "../errors/errors.enum.js";

export const createACart = (req, res) => {
    try{
        const cart = cartsService.createNewCart();
        res.status(200).json({ message: "Cart created" });
    }catch (error){
        res.status(500).json({message: error.message})
    }
};

export const findCart = async (req, res) => {
    try{
        const { cid } = req.params;
        if (!mongoose.Types.ObjectId.isValid(cid)) {
            return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
        }
        const cart = await cartsService.findCartById(cid);
        if (!cart) {            
            return CustomError.generateError(ErrorMessages.CART_NOT_FOUND,404, ErrorName.CART_NOT_FOUND);
        }
        res.status(200).json({ message: "Cart found", cart });
    }catch (error) {
        next(error)                
    }        
};

export const addProductToCart =  async (req, res) => {
    const { cid, pid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid) ) {
        return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
    }
    try {
        const productAdded = await cartsService.addProduct(cid, pid);
        if (!productAdded) {            
            return CustomError.generateError(ErrorMessages.CART_OR_PRODUCT_NOT_FOUND,404, ErrorName.CART_OR_PRODUCT_NOT_FOUND);
        }
    res.status(200).json({ message: "Product added to Cart", cart: productAdded });
    }catch (error){
        next(error) 
    }    
};

export const deleteFromCart =  async (req, res) => {
    const { cid, pid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid) ) {
        return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
    }
    try {
        const productDeleted= await cartsService.deleteOneFromCart(cid, pid);
        if (!productDeleted) {            
            return CustomError.generateError(ErrorMessages.CART_OR_PRODUCT_NOT_FOUND,404, ErrorName.CART_OR_PRODUCT_NOT_FOUND);
        }
    res.status(200).json({ message: "Product deleted from Cart", cart: productDeleted });
    }catch (error){
        next(error) 
    }    
};

export const updateProducts = async (req, res) => {
    const { cid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cid)) {
        return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
    }     
    try {
        const { products } = req.body
        if (!products) {            
            return CustomError.generateError(ErrorMessages.MISSING_DATA,400, ErrorName.MISSING_DATA);
        }
        const cartProds = await cartsService.updateAllProducts(cid, products);       
        if (!cartProds) {            
            return CustomError.generateError(ErrorMessages.CART_NOT_FOUND,404, ErrorName.CART_NOT_FOUND);
        }
        res.status(200).json({ message: "Products updated", cartProds });
    }catch (error) {
        next(error) 
    }
}

export const updateProdQuantity = async (req, res) => {    
    try {
        const {cid, pid} = req.params
        if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid) ) {
            return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
        }        
        const { quantity } = req.body  
        if (!quantity) {            
            return CustomError.generateError(ErrorMessages.MISSING_DATA,400, ErrorName.MISSING_DATA);
        }      
        const response = await cartsService.updateQuantity(cid, pid, +quantity);       
        if (!response) {            
            return CustomError.generateError(ErrorMessages.CART_OR_PRODUCT_NOT_FOUND,404, ErrorName.CART_OR_PRODUCT_NOT_FOUND);
        }
        res.status(200).json({ message: "Product updated", response });
    }catch (error) {
        next(error) 
    }
}

export const deleteAllProductsCart = async (req, res) => {    
    try {
        const {cid} = req.params
        if (!mongoose.Types.ObjectId.isValid(cid)) {
            return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
        }              
        const response = await cartsService.deleteAllProductsInCart(cid);
        if (!response) {            
            return CustomError.generateError(ErrorMessages.CART_NOT_FOUND,404, ErrorName.CART_NOT_FOUND);
        }       
        res.status(200).json({ message: "Products deleted", response });
    }catch (error) {
        next(error) 
    }
}

export const thePurchase = async (req, res) => {    
    try {
        const {cid} = req.params
        if (!mongoose.Types.ObjectId.isValid(cid)) {
            return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
        }              
        const response = await cartsService.purchase(cid);
        if (!response) {            
            return CustomError.generateError(ErrorMessages.CART_NOT_FOUND,404, ErrorName.CART_NOT_FOUND);
        }       
        res.status(200).json({ /* message: "Purchase",  */response });
    }catch (error) {
        next(error) 
    }
}