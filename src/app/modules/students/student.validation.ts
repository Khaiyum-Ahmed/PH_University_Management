import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name is required'),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, 'Last Name is required'),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, 'Father Name is required'),
  fatherOccupation: z.string().trim().min(1, 'Father Occupation is required'),
  fatherContactNo: z.string().trim().min(1, 'Father Contact No is required'),

  motherName: z.string().trim().min(1, 'Mother Name is required'),
  motherOccupation: z.string().trim().min(1, 'Mother Occupation is required'),
  motherContactNo: z.string().trim().min(1, 'Mother Contact No is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1, 'Guardian Name is required'),
  occupation: z.string().trim().min(1, 'Guardian Occupation is required'),
  contactNo: z.string().trim().min(1, 'Guardian Contact No is required'),
  address: z.string().trim().min(1, 'Guardian Address is required'),
});

export const studentValidationZodSchema = z.object({
  id: z.string().min(1, 'ID is required'),

  name: userNameValidationSchema,

  gender: z.enum(['Male', 'Female', 'Others'], {
    message: 'Gender must be Male, Female, or Others',
  }),

  DOB: z.string().trim().min(1, 'Date Of Birth is required'),

  email: z.string().trim().email('Valid email is required'),

  contactNo: z.string().trim().min(1, 'Contact No is required'),

  emergencyContactNo: z
    .string()
    .trim()
    .min(1, 'Emergency Contact No is required'),

  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),

  presentAddress: z.string().trim().min(1, 'Present Address is required'),

  permanentAddress: z.string().trim().min(1, 'Permanent Address is required'),

  guardian: guardianValidationSchema,

  localGuardian: localGuardianValidationSchema,

  profileImg: z.string().optional(),

  isDeleted: z.boolean(),
});
