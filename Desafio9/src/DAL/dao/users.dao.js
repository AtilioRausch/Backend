import { usersModel } from "../models/users.model.js"

class UsersManager  {
    async findUserByID(id) {
        const result = await usersModel.findById(id)
        return result
    }

    async findUserByEmail(email){
        const result = await usersModel.findOne({ email })
        return result
    }

    async createUser(obj){
        const result = await usersModel.create(obj)
        return result
    }

    async findUserByCart(cart){        
        return await usersModel.findOne({cart})                                       
    }
}

export const uManager = new UsersManager()