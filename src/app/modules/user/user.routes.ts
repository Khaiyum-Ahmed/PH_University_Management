import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentZodValidations } from '../students/student.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentZodValidations.createStudentValidationZodSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
