import { cartsModel } from "../../db/models/carts.model.js";

/* import { prodmanager } from "./productManagerMongo.js"; */

class CartsManager {
    async createCart() {
        const result = await cartsModel.create({products: []});
        return result;
    }


    async getCartProducts(cid) {
        const result = await cartsModel.findById(cid);
        return result;                    
    }


    async addProductToCart(cid, pid){
        const selectedCart = await cartsModel.findById(cid);        
        const productIndex = selectedCart.products.findIndex(p => p.product.equals(pid));
        if (productIndex !== -1) {
            selectedCart.products[productIndex].quantity += 1;
        } else {
            selectedCart.products.push({ 
                product: pid, 
                quantity: 1 
            });
        }
        /* await cartsModel.updateOne({ _id: cid }, {products: selectedCart.products}); */
        await selectedCart.save()
        return selectedCart;
    }    
}

export const cManager = new CartsManager();