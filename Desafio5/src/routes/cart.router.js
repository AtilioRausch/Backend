import { Router } from "express";
import { cManager } from "../dao/mongoDB/cartManagerMongo.js";


const router = Router();

/* CREATE CART */
router.post('/', async (req, res)=>{
    try {        
        const response = await cManager.createCart()
        res.status(200).json({message: 'Cart created', cart: response })
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
})



/* ADD PRODUCT TO CART */
router.post('/:cid/products/:pid', async (req, res) =>{    
    try{
        const {cid, pid} = req.params        
        const response = await cManager.addProductToCart(cid, pid)        
        res.status(200).json({message: "Product added to cart", productAddedToCart: response})
        console.log(response)        
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
})



/* GET CART */
router.get('/:cid', async (req, res)=>{
    try {
        const { cid } = req.params
        const response = await cManager.getCartProducts(cid)        
        res.status(200).json({message: 'Cart founded', cartProducts: response.products })
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
})



export default router