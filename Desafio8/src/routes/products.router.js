import { Router } from "express";
import { findProds, findProductById, createProduct, deleteOneProduct, updateProduct } from '../controllers/products.controller.js';

const router = Router();


/* GET PRODUCTS */
router.get("/", findProds);



/* GET PRODUCTS BY ID */
router.get('/:pid', findProductById)



/* ADD PRODUCT */
router.post("/", createProduct);



/* DELETE PRODUCT */
router.delete("/:pid", deleteOneProduct);




/* UPDATE PRODUCT */
router.put("/:pid", updateProduct);



export default router