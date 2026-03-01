/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generatedStudentId } from './user.utils';
import mongoose from 'mongoose';
import { AppError } from '../../errors/AppError';
import status from 'http-status';

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

export const userServices = {
  createStudentIntoDB,
};
