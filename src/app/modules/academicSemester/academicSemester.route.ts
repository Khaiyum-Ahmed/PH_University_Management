import express from 'express';
import { AcademicSemestersControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemestersControllers.createAcademicSemester,
);
router.get('/', AcademicSemestersControllers.getAllAcademicSemester);
router.get('/:id', AcademicSemestersControllers.getSingleAcademicSemester);
router.patch('/:id', AcademicSemestersControllers.updateAcademicSemester);

export const AcademicSemesterRouter = router;
