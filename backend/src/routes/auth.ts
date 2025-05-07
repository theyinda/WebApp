import express from 'express';
import { register, login } from '../controller/auth';
import { Router } from 'express';

const router = Router();


router.post('/register', register as any);
router.post('/login', login as any);

export default router;
