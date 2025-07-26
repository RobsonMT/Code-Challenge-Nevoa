import { Course } from "../entities/Course";
import { User } from "../entities/User";

declare global {
  namespace Express {
    interface Request {
      decoded: Partial<User>;
      user: User;
      course: Course;
    }
  }
}
