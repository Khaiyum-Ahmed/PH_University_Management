import express from 'express';
import { FacultiesControllers } from './faculty.controller';

const router = express.Router();
router.get('/', FacultiesControllers.getAllFaculties);
router.get('/:id', FacultiesControllers.getSingleFaculty);
export const facultyRoutes = router;
