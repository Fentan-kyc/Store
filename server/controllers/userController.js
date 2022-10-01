import ApiError from '../error/ApiError.js';
class UserController{

    async registration(req, res){

    }

    async login(req, res){

    }

    async check(req, res, next){
        const {id} = req.query;

        if (!id || isNaN(id)){
            return next(ApiError.badRequest('Unknown id'))
        }
        res.json(id)
    }

}

export default new UserController()