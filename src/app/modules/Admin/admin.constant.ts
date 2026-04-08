import { TBloodGroup, TGender } from './admin.interface';

export const Gender: TGender[] = ['male', 'female', 'others'];
export const BloodGroup: TBloodGroup[] = [
  'A+',
  'A-',
  'AB+',
  'AB-',
  'B+',
  'B-',
  'O+',
  'O-',
];

export const AdminSearchableFields = [
  'email',
  'id',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.middleName',
  'name.lastName',
];
