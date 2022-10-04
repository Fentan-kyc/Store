import ApiError from '../error/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User, Basket} from '../models/models.js';
import dotenv from 'dotenv/config';

const generateJWT = (id, email, role) => {
    return jwt.sign({id: id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        );
}

class UserController{

    async registration(req, res, next){
        const {email, password, role}  = req.body;
        if(!email || !password){
            return next(ApiError.badRequest('Unknown email or password'))
        }

        const candidate = await User.findOne({where:{email}});
        if(candidate){
            return next(ApiError.badRequest('User already exist'))
        }

        const hasPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email,password: hasPassword ,role})
        const basket = await Basket.create({userId:user.id})
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next){
        const {email, password} = req.body;
        
        const candidate = await User.findOne({where:{email}})
        if(!candidate){
            return next(ApiError.internal("Unknown user"))
        }

        let comparePassword = bcrypt.compareSync(password, candidate.password);
        if(!comparePassword){
            return next(ApiError.internal("Wrong password!"))
        }

        const token = generateJWT(candidate.id, candidate.email, candidate.role)
        return res.json(token);
    }

    async check(){

    }

}

export default new UserController()