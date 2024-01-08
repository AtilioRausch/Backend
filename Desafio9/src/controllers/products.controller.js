/* import { findAllProds, createProd, findProdById, deleteOneProd, updateProd } from "../services/products.service.js"; */
import { productsService } from "../repositoryServices/index.js";
import {generateProduct} from '../faker.js'
import mongoose from "mongoose";
import CustomError from "../errors/error.generator.js";
import { ErrorMessages, ErrorName } from "../errors/errors.enum.js";

export const findProds = async (req, res) => {
    try{
        const prods = await productsService.findAllProds(req.query);
        console.log(prods)
        res.status(200).json({ prods });
    }catch (error){
        res.status(500).json({message: error.message})
    }    
};

export const findProductById = async (req, res, next) => {
    try{
        const { pid } = req.params;
        if (!mongoose.Types.ObjectId.isValid(pid)) {
            return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
        }
        const prod = await productsService.findProdById(pid);
        if (!prod) {
            return CustomError.generateError(ErrorMessages.PRODUCT_NOT_FOUND,404, ErrorName.PRODUCT_NOT_FOUND);
        }
        return res.status(200).json({ message: "Product found", prod });
    }catch (error) {
        next(error)
    }        
};

export const createProduct =  async (req, res) => {
    const { title, description, price, code, stock, category } = req.body;

    if (!title || !description || !price || !code || !stock || ! category) {
        return CustomError.generateError(ErrorMessages.MISSING_DATA,400, ErrorName.MISSING_DATA);
    }
    try {
        const createdProduct = await productsService.createProd(req.body);
    res.status(200).json({ message: "Product created", user: createdProduct });
    }catch (error){
        next(error)
    }
};

export const deleteOneProduct = async (req, res) => {
    const { pid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
    }
    try {
        const prod = await productsService.deleteOneProd(pid);
        if (!prod) {
            return CustomError.generateError(ErrorMessages.PRODUCT_NOT_FOUND,404, ErrorName.PRODUCT_NOT_FOUND);
        }
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res) => {
    const { pid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return CustomError.generateError(ErrorMessages.OID_INVALID_FORMAT,404, ErrorName.OID_INVALID_FORMAT);
    }
    try {
        const prod = await productsService.updateProd(pid, req.body);
        if (!prod) {
            return CustomError.generateError(ErrorMessages.PRODUCT_NOT_FOUND,404, ErrorName.PRODUCT_NOT_FOUND);
        }
        res.status(200).json({ message: "Product updated", prod });
    }catch (error) {
        next(error)
    }
}

export const productMocks = (req, res) => {
    try{
        const products = generateProduct()
        return res.json({ products })        
    }catch (error){
        res.status(500).json({message: "aca"})
    }    
};

