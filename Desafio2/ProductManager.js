const fs = require('fs')


class ProductManager {
    constructor(path) {
        this.path = path
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)){
                const productsFile= await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(productsFile)
            }else {
                return []
            }
        }
        catch (error) {
            return error
        }
    }



    async addProduct(product) {
        try {
            const {title, description, price, thumbnail, code, stock} = product
            if (!title || !description || !price || !thumbnail || !stock || !code) {
                console.log("Warning! All fields must be filled")
                return
            }
            const products = await this.getProducts()

            let id 
            if(!products.length){
                id = 1
            } else {
                id = products[products.length-1].id + 1
            }
            
            const isCodeAlreadyAdded = products.some((prod)=> prod.code === code)
            if (isCodeAlreadyAdded) {
                console.log("Warning! The product code already exists")
                return
            }
            const newProduct = {id, ...product}

            products.push(newProduct)

            await fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log('Product succesfully added')
        }
        catch (error) {
            console.log(error)
            return error
        }
    }



    async getProductById(id) {
        try {
            const products = await this.getProducts()

            const productSearched = products.find(p=> p.id == id)            
            if (productSearched) {                
                return productSearched

              }else {                
                return 'Product not found'                
            }   
        }
        catch (error) {
            return error
        }
    }

    async deleteProductById(id) {
        try {
            const products = await this.getProducts()

            const idExists = products.find(p=> p.id === id)  

            let message = ''

            if (!idExists){
                console.log(`Product with id ${id} does not exist`) ;
                
                }else {
                const newArrayProducts = products.filter(p=> p.id !== id)
                await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts))
                console.log(`Product with id ${id} was succesfully deleted`);
            }
            
            }
        catch (error) {
            return error
        }
    }



    async updateProduct(id, update) {
        try {
            
            const products = await this.getProducts()            

            const prodIndex = products.findIndex(p=> p.id == id)
            
            if (prodIndex !== -1) {
                for (const key in update) {
                    if (key == "code" && products[prodIndex].code !== update.code) {                        
                        const isCodeAlreadyAdded = products.some((prod)=> prod.code === update.code)
                        if (isCodeAlreadyAdded) {
                            console.log("Warning! The product code already exists.\nGenerate a code")
                            return
                        }                        
                    }                   
                    if (products[prodIndex].hasOwnProperty(key)){
                        products[prodIndex][key] = update[key]

                    }else{
                        console.log('One of the properties that you want to modify does not exist in the dB')
                        return
                    }                                            
                }
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                console.log(`Product with id ${id} was succesfully updated`)                

            }else {
                console.log(`The product with id ${id} does not exist`)
            }


        }
        catch (error) {
            return error
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//TESTING

async function test() {
    const manager = new ProductManager("myprods.json")

    /* este primer LLAMADO A GETPRODUCTS devuelve un array vacío */
    //console.log( await manager.getProducts())

    
    /* AGREGAR PRODUCTO */
    /* await manager.addProduct({
        title: "producto prueba4",
        description: "esto es un producto prueba",
        price: 200,
        thumbnail: "sin imagen",
        code: "abc121",    
        stock: 25
    })
    console.log( await manager.getProducts()) */
    

    /* GET PRODUCT BY ID */
    //console.log(await manager.getProductById(1))


    /* DELETE PRODUCT BY ID */
    // await manager.deleteProductById(2)
    // console.log( await manager.getProducts())


    /* UPDATE PRODUCT */
    /* await manager.updateProduct(2,{        
        title: "Producto Lindo",
        description: "Mi producto favorito",        
        code: "abc122"              
    })
    console.log( await manager.getProducts()) */
}

test()