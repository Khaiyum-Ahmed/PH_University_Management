import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Students are retrieve successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(
    studentId as string,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single Student is retrieve successfully',
    data: result,
  });
});

const deleteAStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteAStudentFromDB(
    studentId as string,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student Deleted successfully Done',
    data: result,
  });
});
const updateAStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(
    studentId as string,
    student,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student is Updated successfully Done',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteAStudent,
  updateAStudent,
};
