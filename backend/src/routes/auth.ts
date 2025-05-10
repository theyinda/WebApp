import express from 'express';
import { register, login, logout } from '../controller/auth';
import { Router } from 'express';

const router = Router();


router.post('/register', register as any);
router.post('/login', login as any);
router.post('/logout', logout as any)

export default router;
