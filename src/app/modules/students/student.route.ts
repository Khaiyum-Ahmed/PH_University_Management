import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentZodValidations } from './student.validation';

const router = express.Router();

// will call controller function

router.get('/', StudentControllers.getAllStudents);

router.get('/:id', StudentControllers.getSingleStudent);

router.delete('/:id', StudentControllers.deleteAStudent);
router.patch(
  '/:id',
  validateRequest(StudentZodValidations.updateStudentValidationZodSchema),
  StudentControllers.updateAStudent,
);

export const StudentRoutes = router;
