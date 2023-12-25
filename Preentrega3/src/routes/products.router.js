import { Router } from "express";
import { findProds, findProductById, createProduct, deleteOneProduct, updateProduct } from '../controllers/products.controller.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();


/* GET PRODUCTS */
router.get("/", findProds);



/* GET PRODUCTS BY ID */
router.get('/:pid', findProductById)



/* ADD PRODUCT */
router.post("/", authMiddleware(["ADMIN"]), createProduct);



/* DELETE PRODUCT */
router.delete("/:pid", authMiddleware(["ADMIN"]), deleteOneProduct);




/* UPDATE PRODUCT */
router.put("/:pid", authMiddleware(["ADMIN"]), updateProduct);



export default router