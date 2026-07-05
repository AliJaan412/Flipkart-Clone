import express from  'express';
import { getProductById, getProducts } from '../controller/product-controller.js';
import { userSignUp, userLogIn, getProfile } from '../controller/user-controller.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);
router.get('/profile', authenticate, getProfile);
// product's requests
router.get('/products', getProducts);
router.get('/product/:id', getProductById);

export default router;