import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // will call service function to send this data
  const result = await userServices.createStudentIntoDB(password, studentData);

  // send response
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student created Successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
