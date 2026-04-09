/* eslint-disable preserve-caught-error */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import {
  generateAdminId,
  generatedFacultyId,
  generatedStudentId,
} from './user.utils';
import mongoose from 'mongoose';
import { AppError } from '../../errors/AppError';
import status from 'http-status';
import { TFaculty } from '../Faculty/faculty.interface';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  //  if Password is not given, use default password
  userData.password = password || (config.default_pass as string);

  // const isStudentExists = await StudentModel.findOne({ id: payload.id });
  // if (isStudentExists) {
  //   throw new AppError(status.CONFLICT, 'Student already exists with this ID');
  // }
  // const isUserExists = await UserModel.findById(payload.user);
  // if (!isUserExists) {
  //   throw new AppError(status.NOT_FOUND, 'User does not exist');
  // }
  //   create a user object

  //   set student role

  userData.role = 'student';
  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //   set  generated Id
    userData.id = await generatedStudentId(admissionSemester!);

    //   create a user(transaction-1)

    const newUser = await UserModel.create([userData], { session });

    //   create a student

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create user');
    }

    // set id, _id as user
    payload.id = newUser[0]!.id;
    payload.user = newUser[0]!._id; // reference _id

    //   create a student(transaction-2)
    const newStudent = await StudentModel.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(status.BAD_REQUEST, 'Failed to create new student ');
  }

  // const result = await studentInstance.save(); // built in instance method provided by mongoose
  // return newUser;
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  //  set faculty role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // set generated id
    userData.id = await generatedFacultyId();

    // create a user (transaction -1)
    const newUser = await UserModel.create([userData], { session }); //array

    // create a faculty
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create user');
    }
    // set id, _id as a user
    payload.id = newUser[0]!.id;
    payload.user = newUser[0]!._id; // reference _id

    // create a faculty (transaction -2)
    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create faculty');
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_pass as string);

  // set Admin role
  userData.role = 'admin';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // set generated ID
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session });

    // create a admin
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create Admin');
    }

    // set id, _id as user
    payload.id = newUser[0]!.id;
    payload.user = newUser[0]!._id; // reference _id

    // create a admin (transaction -2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create Admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
