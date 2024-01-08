import { Router } from "express";
import { findProds, findProductById, createProduct, deleteOneProduct, updateProduct, productMocks } from '../controllers/products.controller.js';
import { productsService } from "../repositoryServices/index.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = Router();


/* GET PRODUCTS */
router.get("/", findProds);

/* MOCKING PRODUCTS */
router.get("/mockingproducts", productMocks);

/* GET PRODUCTS BY ID */
router.get('/:pid', findProductById)


// router.get('/:pid', async (req, res) =>{
//     try{
//         const { pid } = req.params;
//     const prod = await productsService.findProdById(pid);
//     /* if (!prod) {
//         CustomError.generateError(ErrorsMessages.CART_NOT_FOUND, 500, ErrorsName.CART_NOT_FOUND)
//         } */
//     res.status(200).json({ message: "Product found", prod });
//     } catch (error){
//         next(error);
//         console.log(`getAll: ${error.message}`);
//         /* res.status(500).json({ message: "Product NOT found"}) */
//     }    
// })




/* ADD PRODUCT */
router.post("/", authMiddleware(["ADMIN"]), createProduct);



/* DELETE PRODUCT */
router.delete("/:pid", authMiddleware(["ADMIN"]), deleteOneProduct);




/* UPDATE PRODUCT */
router.put("/:pid", authMiddleware(["ADMIN"]), updateProduct);






export default router