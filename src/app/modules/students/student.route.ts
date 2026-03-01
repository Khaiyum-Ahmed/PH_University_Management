import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentZodValidations } from './student.validation';

const router = express.Router();

// will call controller function

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.delete('/:studentId', StudentControllers.deleteAStudent);
router.patch(
  '/:studentId',
  validateRequest(StudentZodValidations.updateStudentValidationZodSchema),
  StudentControllers.updateAStudent,
);

export const StudentRoutes = router;
