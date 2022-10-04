import * as uuid from 'uuid';
import path from 'path';
import {Product} from '../models/models.js';
import ApiError from '../error/ApiError.js';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

class ProductController{

    async create(req, res, next){
        try{
        const {name, price, brandId, typeId, info} = req.body;
         const {img} = req.files;
         let fileName = uuid.v4() + '.jpg';
         img.mv(path.resolve(dirname(fileURLToPath(import.meta.url)), '..', 'static',fileName));

         const product = await Product.create({name,price,brandId,typeId, img:fileName});

         return res.json(product);

         } catch (e) {
             next(ApiError.badRequest(e.message));
         }
    }

    async getAll(req, res){
        let {brandId, typeId, limit, page } = req.query;

        page = page || 1; //Default
        limit = limit || 10;
        let offset = page * limit - limit;

        let products;
        if(!brandId && !typeId){
            products = await Product.findAndCountAll({offset,limit});
        }
        if(brandId && !typeId){
            products = await Product.findAndCountAll({where:{brandId},offset,limit});
        }
        if(!brandId && typeId){
            products = await Product.findAndCountAll({where:{typeId},offset,limit});
        }
        if(brandId && typeId){
            products = await Product.findAndCountAll({where:{brandId, typeId},offset,limit});
        }
        return res.json(products);
    }

    async getById(req, res){

    }

}

export default new ProductController()