import { model, Schema } from 'mongoose';
import { TAcademicSemester, TMonth } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
} from './academicSemester.constant';
import { AppError } from '../../errors/AppError';
import status from 'http-status';
export const Months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const TAcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: AcademicSemesterName, required: true },
    code: { type: String, enum: AcademicSemesterCode, required: true },
    year: { type: String, required: true },
    startMonth: { type: String, enum: Months },
    endMonth: { type: String, enum: Months },
  },
  {
    timestamps: true,
  },
);
// pre hook validation
TAcademicSemesterSchema.pre('save', async function () {
  const isSemesterExists = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new AppError(
      status.NOT_FOUND,
      `The ${this.name} semester already exists in this year!`,
    );
  }
});

// create model
export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  TAcademicSemesterSchema,
);
