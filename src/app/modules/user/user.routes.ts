import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationZodSchema } from '../students/student.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationZodSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
