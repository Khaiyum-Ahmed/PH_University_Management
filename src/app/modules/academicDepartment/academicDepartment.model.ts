import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import status from 'http-status';
import { AppError } from '../../errors/AppError';
import { _QueryFilter } from 'mongoose';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function () {
  const isDepartmentExists = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new AppError(status.NOT_FOUND, `${this.name} is Already Exists !`);
  }
});
academicDepartmentSchema.pre('findOneAndUpdate', async function () {
  // const query = this.getQuery() as Partial<TAcademicDepartment>;
  const query = this.getQuery() as _QueryFilter<TAcademicDepartment>;
  const isDepartmentExists = await AcademicDepartmentModel.findOne(query);
  if (!isDepartmentExists) {
    throw new AppError(status.NOT_FOUND, 'This Department Does not Exists !');
  }
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
