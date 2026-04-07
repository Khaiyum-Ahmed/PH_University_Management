import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { StudentRoutes } from '../modules/students/student.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { facultyRoutes } from '../modules/Faculty/faculty.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRouter,
  },

  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: facultyRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoute,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);

export default router;
