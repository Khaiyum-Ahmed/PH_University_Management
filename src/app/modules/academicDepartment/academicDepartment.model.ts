import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const createAcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
  },
  {
    timestamps: true,
  },
);

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  createAcademicDepartmentSchema,
);
