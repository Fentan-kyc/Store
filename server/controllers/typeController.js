import {Type} from '../models/models.js';
import ApiError from '../error/ApiError.js';

class TypeController{

    async create(req, res){
        const {name} = req.body;
        const type = await Type.create({name});
        return res.json(type);
    }

    async getAll(req, res){

    }

}

export default new TypeController()