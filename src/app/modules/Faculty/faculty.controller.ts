import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultiesServices } from './faculty.service';

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultiesServices.getAllFacultiesFromDB(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculties are retrieved successfully',
    data: result,
  });
});
const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultiesServices.getSingleFacultyFromDB(id as string);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty is retrieved successfully',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultiesServices.updateFacultyIntoDB(
    id as string,
    faculty,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty is Updated Successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultiesServices.deleteFacultyFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty is deleted successfully',
    data: result,
  });
});

export const FacultiesControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
