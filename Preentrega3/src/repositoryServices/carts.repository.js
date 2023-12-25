import { cManager } from "../DAL/dao/carts.dao.js";
import { uManager } from "../DAL/dao/users.dao.js";
import { ticketsDao } from "../DAL/dao/tickets.dao.js";
import { v4 as uuidv4 } from 'uuid'

export default class CartsRepository {
    
    async createNewCart() {
        const carts = cManager.createCart();
        return carts;
    }

    async findCartById(id) {
        const cart = await cManager.getCartProducts(id);
        /* console.log(cart) */
        return cart
    }

    async addProduct(cid, pid) {
        const prod = cManager.addProductToCart(cid,pid);
        return prod;
    }

    async deleteOneFromCart(cid, pid) {
        const cart = cManager.deleteProduct(cid,pid);
        return cart;
    }

    async updateAllProducts(cid, arr) {
        const prods = cManager.updateAllProducts(cid, arr);
        return prods;
    }

    async updateQuantity(cid, pid, quantity) {
        const prod = cManager.updateProductQuantity(cid, pid, quantity);
        return prod;
    }

    async deleteAllProductsInCart(cid) {
        const cart = cManager.deleteAllProducts(cid);
        return cart;
    }

    async purchase(cid){
        // suficiente stock restarlo del stock
        // stock insuficiente no agregar el prod a la compra final
        // generar un ticket
        // devolver arreglo prod si compra no exitosa
        // carrito debe tener al final solo productos que no se compraron
        const cart = await cManager.getCartProducts(cid)
        const user = await uManager.findUserByCart(cid)
        const products = cart.products
        console.log(user)
        let availableProducts = []
        let unavailableProducts = []
        let totalAmount = 0
        for(let item of products) {
            console.log(item)
            if(item.product.stock >= item.quantity){
                availableProducts.push(item)
                item.product.stock -= item.quantity
                await item.product.save()
                totalAmount += item.quantity * item.product.price
            }else{
                unavailableProducts.push(item)
            }
        }
        
        cart.products = unavailableProducts
        await cart.save()
        
        console.log("available", availableProducts)
        console.log("unavailable", unavailableProducts)
        if(availableProducts.length){
            const ticket = {
                code:uuidv4(),
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: user.email
            }
            await ticketsDao.createTicket(ticket)
            console.log("entra")
            return { availableProducts, totalAmount }
        }
        console.log("no entra")
        return { unavailableProducts }
    }
}