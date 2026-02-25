import z from 'zod';

const academicFacultyValidationSchema = z.object({
  name: z.string({ error: 'Academic Faculty must be string' }),
});
export const AcademicFacultyValidation = {
  academicFacultyValidationSchema,
};
