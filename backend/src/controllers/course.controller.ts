import { Request, Response } from "express";
import courseService from "../services/course.service";

class CourseController {
  createCourseController = async (req: Request, res: Response) => {
    const course = await courseService.createService(req);
    return res.status(201).json(course);
  };

  findAllCoursesController = async (_: Request, res: Response) => {
    const courses = await courseService.findAllService();
    return res.status(200).json(courses);
  };

  findCourseByIdController = async (req: Request, res: Response) => {
    const courseFound = await courseService.findByIdService(req);
    return res.status(200).json(courseFound);
  };

  updateCourseController = async (req: Request, res: Response) => {
    const updatedCourse = await courseService.updateService(req);
    return res.status(200).json(updatedCourse);
  };

  deleteCourseController = async (req: Request, res: Response) => {
    const deletedCourse = await courseService.deleteService(req);
    return res.status(204).send();
  };

  findActiveCoursesController = async (_: Request, res: Response) => {
    const courses = await courseService.listPublicService();
    res.status(200).json(courses);
  };
}

export default new CourseController();
