import express from 'express';
import { analytics } from '../controller/analytics';
import { authorizeRoles } from '../middlewares/roles';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.get(
    "/",
    authenticate as any,
    authorizeRoles("ADMIN") as any,
    analytics as any
);

export default router;

