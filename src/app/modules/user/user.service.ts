import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generatedStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //   if (await StudentModel.isUserExists(studentData.id)) {
  //     throw new Error('Student User already exists!');
  //   }

  //   create a user object
  const userData: Partial<TUser> = {};

  //  if Password is not given, use default password
  userData.password = password || (config.default_pass as string);
  //   set student role

  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );
  //   set  generated Id
  userData.id = await generatedStudentId(admissionSemester!);

  //   create a user

  const newUser = await UserModel.create(userData); // built in static method

  //   create a student

  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; // reference _id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }

  // const studentInstance = new StudentModel(studentData); // create an instance
  // if (await studentInstance.isUserExists(studentData.id)) {
  //   throw new Error('User already exists!');
  // }

  // const result = await studentInstance.save(); // built in instance method provided by mongoose

  return newUser;
};

export const userServices = {
  createStudentIntoDB,
};
