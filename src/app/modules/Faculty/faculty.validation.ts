import z from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First Name is required')
    .max(20, 'Name can not be more than 20 characters'),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last Name is required')
    .max(20, 'Name can not be more than 20 characters'),
});

export const facultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      id: z.string().min(1, 'ID is required'),
      user: z.string().min(1, 'User ID is required'),
      designation: z.string().min(1, 'Designation is required'),
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      email: z.email('email is required'),
      contactNo: z.string().min(1, 'Contact Number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency Contact Number is required'),
      presentAddress: z.string().min(1, 'Present Address is required'),
      permanentAddress: z.string().min(1, 'Permanent Address is required'),
      academicDepartment: z
        .string()
        .min(1, 'Academic Department ID is required'),
    }),
  }),
});
