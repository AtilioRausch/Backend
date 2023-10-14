import { Router } from "express";
import { manager } from "../prodManager.js";

const router = Router();

router.get('/', async (req, res)=>{
    try {
        const products = await manager.getProducts(req.query)
        if (!products.length){
            return res.status(404).json({message: 'Products not found'})    
        }

        res.status(200).json({message: 'Products found', products})
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
})


router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params
        const productById = await manager.getProductById(+id)
        if (!productById) {
            return res
                .status(404)
                .json({ message: "Product not found with the id provided" });
            }
        res.status(200).json({ message: "Product found", productById });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }        
})


router.post('/', async (req, res) => {
    const {title, description, price, code, stock, category} = req.body
    if (!title || !description || !price || !stock || !code || !category) {
        return res
            .status(401)
            .json({error: 'Some data is missing'})
    }

    if(typeof price !== 'number' || typeof stock !== 'number'){
        return res
            .status(400)
            .json({error: 'Price and stock must be numbers'})
    }
    
    const products = await manager.getProducts({})
    const isCodeAlreadyAdded = products.some((prod)=> prod.code === code)
    if (isCodeAlreadyAdded) {
        return res
            .status(409)
            .json({error: 'The product code already exists'})
    }
    try {
        const response = await manager.addProduct(req.body)
        res.status(200).json({message : 'Product added', product: response})
    }    
    catch(error){
        res.status(500).json({ message: error.message });
    } 
})


router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params
        const response = await manager.deleteProductById(+id)
        if (!response) {
            return res
                .status(404)
                .json({message: "Product not found with the id provided" })
        }
        res.status(200).json({message: "Product deleted", deletedProduct : response})
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
})


router.put('/:id', async (req, res) => {
    const {id} = req.params
    try{        
        const response = await manager.updateProduct(+id, req.body)
        if(!response){
            return res
                .status(404) 
                .json({message: "Product not found with the id provided"})
        }
        res.status(200).json({message: "Product updated", productUpdated: response})
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }

})


export default router