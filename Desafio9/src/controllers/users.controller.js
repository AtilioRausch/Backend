import { usersService } from "../repositoryServices/index.js";
import passport from "passport";
import mongoose from "mongoose";
import CustomError from "../errors/error.generator.js";
import { ErrorMessages, ErrorName } from "../errors/errors.enum.js";


export const findUserById = (req, res) => {
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try{
            const { idUser } = req.params;
            const user = await usersService.findById(idUser);
            if (!user) {
                    return CustomError.generateError(ErrorMessages.USER_NOT_FOUND,404, ErrorName.USER_NOT_FOUND);
                }
            res.json({ message: "User", user });
        }catch (error){
            next(error)
        }
}};

export const findUserByEmail = async (req, res) => {
    try {
        const { UserEmail } = req.body;        
        const user = await usersService.findByEmail(UserEmail);
        if (!user) {
            return CustomError.generateError(ErrorMessages.USER_NOT_FOUND,404, ErrorName.USER_NOT_FOUND);
        }
        res.status(200).json({ message: "User found", user });
    } catch (error) {
        next(error)
    }
    
};

export const createUser =  async (req, res) => {
    try{
        const { name, lastName, email, password } = req.body;
        if (!name || !lastName || !email || !password) {
            return CustomError.generateError(ErrorMessages.MISSING_DATA,400, ErrorName.MISSING_DATA);
        }
        const createdUser = await usersService.createOne(req.body);
        res.status(200).json({ message: "User created", user: createdUser });
    }catch (error){
        next(error)
    }    
};

