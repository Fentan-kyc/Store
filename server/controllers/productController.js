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
        const {brandId, typeId} = req.query;
        let products;
        if(!brandId && !typeId){
            products = await Product.findAll();
        }
        if(brandId && !typeId){
            products = await Product.findAll({where:{brandId}});
        }
        if(!brandId && typeId){
            products = await Product.findAll({where:{typeId}});
        }
        if(brandId && typeId){
            products = await Product.findAll({where:{brandId, typeId}});
        }
        return res.json(products);
    }

    async getById(req, res){

    }

}

export default new ProductController()