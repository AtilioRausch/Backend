import { createNewCart, findCartById, addProduct, deleteOneFromCart, updateAllProducts, updateQuantity, deleteAllProductsInCart } from "../services/carts.service.js";


export const createACart = (req, res) => {
    try{
        const cart = createNewCart();
        res.status(200).json({ cart });
    }catch (error){
        res.status(500).json({message: error.message})
    }
};


export const findCart = async (req, res) => {
    try{
        const { cid } = req.params;
        const cart = await findCartById(cid);
        if (!cart) {
                return res.status(404).json({ message: "No cart found with the id" });
            }
        res.status(200).json({ message: "Cart found", cart });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }        
};


export const addProductToCart =  async (req, res) => {
    const { cid, pid } = req.params;

    if (!cid || !pid ) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const productAdded = await addProduct(cid, pid);
    res.status(200).json({ message: "Product added to Cart", cart: productAdded });
    }catch (error){
        res.status(500).json({ message: error.message });
    }    
};


export const deleteFromCart =  async (req, res) => {
    const { cid, pid } = req.params;

    if (!cid || !pid ) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const productDeleted= await deleteOneFromCart(cid, pid);
    res.status(200).json({ message: "Product deleted to Cart", cart: productDeleted });
    }catch (error){
        res.status(500).json({ message: error.message });
    }    
};


export const updateProducts = async (req, res) => {
    const { cid } = req.params;
    try {
        const { products } = req.body
        const cartProds = await updateAllProducts(cid, products);       
        res.status(200).json({ message: "Products updated", cartProds });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProdQuantity = async (req, res) => {    
    try {
        const {cid, pid} = req.params
        const { quantity } = req.body        
        const response = await updateQuantity(cid, pid, +quantity);       
        res.status(200).json({ message: "Product updated", response });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteAllProductsCart = async (req, res) => {    
    try {
        const {cid} = req.params              
        const response = await deleteAllProductsInCart(cid);       
        res.status(200).json({ message: "Products deleted", response });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}