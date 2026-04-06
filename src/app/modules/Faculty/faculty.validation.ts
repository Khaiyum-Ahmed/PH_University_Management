import z from 'zod';
import { BloodGroup, Gender } from './faculty.constant';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First Name is required')
    .max(20, 'Name can not be more than 20 characters')
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a Capital letter',
    }),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last Name is required')
    .max(20, 'Name can not be more than 20 characters'),
});

export const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
      id: z.string().min(1, 'ID is required'),
      user: z.string().min(1, 'User ID is required'),
      designation: z.string().min(1, 'Designation is required'),
      name: userNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      email: z.email('email is required'),
      contactNo: z.string().min(1, 'Contact Number is required'),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
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

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

export const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      id: z.string().min(1, 'ID is required').optional(),
      user: z.string().min(1, 'User ID is required').optional(),
      designation: z.string().min(1, 'Designation is required').optional(),
      name: updateUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      email: z.email('email is required').optional(),
      contactNo: z.string().min(1, 'Contact Number is required').optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency Contact Number is required')
        .optional(),
      presentAddress: z
        .string()
        .min(1, 'Present Address is required')
        .optional(),
      permanentAddress: z
        .string()
        .min(1, 'Permanent Address is required')
        .optional(),
      academicDepartment: z
        .string()
        .min(1, 'Academic Department ID is required')
        .optional(),
    }),
  }),
});

export const facultyZodValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
