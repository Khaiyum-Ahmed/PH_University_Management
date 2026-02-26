import z from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({ error: 'Academic Department must be string' }),
    academicFaculty: z.string({ error: 'Academic  must be string' }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({ error: 'Academic Department must be string' }).optional(),
    academicFaculty: z
      .string({ error: 'Academic Faculty must be string' })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
