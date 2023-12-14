import { findAllProds, createProd, findProdById, deleteOneProd, updateProd } from "../services/products.service.js";



export const findProds = async (req, res) => {
    try{
        const prods = await findAllProds(req.query);
        console.log(prods)
        res.status(200).json({ prods });
    }catch (error){
        res.status(500).json({message: error.message})
    }    
};


export const findProductById = async (req, res) => {
    try{
        const { pid } = req.params;
        const prod = await findProdById(pid);
        if (!prod) {
                return res.status(404).json({ message: "No product found with the id" });
            }
        res.status(200).json({ message: "Product found", prod });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }        
};


export const createProduct =  async (req, res) => {
    const { title, description, price, code, stock, category } = req.body;

    if (!title || !description || !price || !code || !stock || ! category) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const createdProduct = await createProd(req.body);
    res.status(200).json({ message: "Product created", user: createdProduct });
    }catch (error){
        res.status(500).json({ message: error.message });
    }
    
};


export const deleteOneProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const prod = await deleteOneProd(pid);
        if (!prod) {
            return res
            .status(404)
            .json({ message: "Product not found with the id provided" });
        }
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}


export const updateProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const prod = await updateProd(pid, req.body);
        if (!prod) {
            return res
            .status(404)
            .json({ message: "Product not found with the id provided" });
        }
        res.status(200).json({ message: "Product updated", prod });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}
