import { manager } from "../dao/products.dao.js";


export const findAllProds = (obj) => {
  const users = manager.findAll(obj);
  return users;
};

export const createProd = (obj) => {
    const user = manager.createOne(obj);
    return user;
};

export const findProdById = (id) => {
const user = manager.findById(id);
return user;
};

export const deleteOneProd = (id) => {
    const user = manager.deleteOne(id);
    return user;
};

export const updateProd = (id, obj) => {
    const user = manager.updateOne(id, obj);
    return user;
};