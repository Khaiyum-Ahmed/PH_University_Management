import express from 'express';
import { FacultiesControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();
router.get('/', FacultiesControllers.getAllFaculties);
router.get('/:id', FacultiesControllers.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultiesControllers.updateFaculty,
);
router.delete('/:id', FacultiesControllers.deleteFaculty);
export const facultyRoutes = router;
