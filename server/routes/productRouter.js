import { Router } from "express";
const router = new Router();

import productController from '../controllers/productController.js';


router.post('/', productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

export default router;