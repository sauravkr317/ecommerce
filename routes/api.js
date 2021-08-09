import express from 'express';
import { productsController } from '../app/http/controller';

const router = express.Router();

// products related routes
router.post('/api/products', productsController.store);

export default router;