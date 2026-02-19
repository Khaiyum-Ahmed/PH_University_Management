import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Students are retrieve successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

const deleteAStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteAStudent,
};
