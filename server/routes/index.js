import { Router } from "express";
const router = new Router();

import brandRouter from "./brandRouter.js";
import productRouter from "./productRouter.js";
import typeRouter from "./typeRouter.js";
import userRouter from "./userRouter.js";


router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/product', productRouter);

export default router;