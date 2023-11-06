import { Router } from "express";
import { manager } from "../dao/mongoDB/productManagerMongo.js";
import { cManager } from "../dao/mongoDB/cartManagerMongo.js";


const router = Router();


router.get("/api/views/products", async (req, res) => {  
  try {
      const products = await manager.findAll(req.query)
      const {payload, info, page, limit, order, query} = products
      const { nextPage, prevPage } = info
      const {category} = query
      /* res.render("catalogue", {payload}); */
      const productObject = payload.map(doc => doc.toObject()); 
      console.log('productObject', productObject)
      res.render('catalogue', { productList: productObject, category, page: page, limit: limit, order: order, nextPage: nextPage, prevPage:prevPage, style: "style" });
      console.log(payload)     
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.get('/api/views/products/:id', async (req, res) => {  
  try {
      const { id } = req.params
      const product = await manager.findById(id)              
      res.render('product', { product: product.toObject(), style: "productDetail" });           
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});



router.get('/api/views/cart/:cid', async (req, res) => {  
  try {
    const { cid } = req.params
    const response = await cManager.getCartProducts(cid)
    const array = response.products.map(doc => doc.toObject());    
    res.render('cart', {cartProductList: array,  style: "cart" })
}
catch (error){
    res.status(500).json({ message: error.message });
}
})



export default router;