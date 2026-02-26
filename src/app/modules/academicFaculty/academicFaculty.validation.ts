import z from 'zod';

const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({ error: 'Academic Faculty must be string' }),
  }),
});
const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({ error: 'Academic Faculty must be string' }).optional(),
  }),
});

export const AcademicFacultyValidation = {
  academicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
