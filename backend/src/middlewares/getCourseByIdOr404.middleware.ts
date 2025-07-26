import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entities/Course";

const getCourseByIdOr404 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const courseRepository = AppDataSource.getRepository(Course);

  try {
    const { id } = req.params;

    const course = await courseRepository.findOneBy({ id });

    if (!course) {
      throw new Error();
    }

    req.course = course;

    next();
  } catch (err: any) {
    if (err instanceof Error) {
      return res.status(404).json({ error: "Course not found" });
    }
  }
};

export default getCourseByIdOr404;
