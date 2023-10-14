import { Router } from "express";
import { manager } from "../prodManager.js";

const router = Router();

router.get("/", async (req, res) => {  
    try {
        const response = await manager.getProducts(req.query);
        res.render("index", {response, style: "style"});
        console.log(response)
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});


router.get("/realtimeproducts",  (req,res)=>{    
    res.render("realTimeProducts", {style: "styleRealTime"})    
});


export default router;