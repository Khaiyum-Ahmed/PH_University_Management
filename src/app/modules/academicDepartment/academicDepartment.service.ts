import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntDB = async (payload: TAcademicDepartment) => {
  //   const isDepartmentExists = await AcademicDepartmentModel.findOne({
  //     name: payload.name,
  //   });
  //   if (isDepartmentExists) {
  //     throw new Error(`${payload.name} is already exists ! `);
  //   }
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};
const getAllAcademicDepartmentFromDB = async () => {
  const result =
    await AcademicDepartmentModel.find().populate('academicFaculty');
  return result;
};
const getSingleAcademicDepartmentFromDB = async (departmentId: string) => {
  const result =
    await AcademicDepartmentModel.findById(departmentId).populate(
      'academicFaculty',
    );
  return result;
};
const updateAcademicDepartmentIntoDB = async (
  departmentId: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: departmentId },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
