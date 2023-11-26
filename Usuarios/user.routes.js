import { createUser, deleteUser, getUser, patchUser } from "./user.controller.js";
import {Router} from 'express';
const router = Router();


// Endpoint GET /Users/get
router.get('/users/search', getUser );

// Endpoint POST /Users
router.post('/users/create', createUser);

// Endpoint PATCH /prueba
router.patch('/users/edit', patchUser);

// Endpoint DELETE /prueba
router.delete('/users/delete', deleteUser );

export default router;