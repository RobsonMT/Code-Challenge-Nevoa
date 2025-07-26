import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entities/Course";

export class CourseService {
  private courseRepo = AppDataSource.getRepository(Course);

  createService = async ({ body }: Request) => {
    return await this.courseRepo.save(body);
  };

  findAllService = async () => {
    return await this.courseRepo.find();
  };

  findByIdService = async ({ course, body }: Request) => {
    return await this.courseRepo.findOneBy({ id: course.id });
  };

  updateService = async ({ course, body }: Request) => {
    await this.courseRepo.update(course.id, { ...body });
    return await this.courseRepo.findOneBy({ id: course.id });
  };

  deleteService = async ({ course, body }: Request) => {
    return await this.courseRepo.delete(course.id);
  };

  listPublicService = async () => {
    return await this.courseRepo.find({ where: { status: true } });
  };
}

export default new CourseService();
