import { Router } from "express";
import validadeSchema from "../middlewares/validateSchema.middleware";
import userController from "../controllers/user.controller";
import courseController from "../controllers/course.controller";
import validateAuthToken from "../middlewares/validateAuthToken.middleware";
import getCourseByIdOr404 from "../middlewares/getCourseByIdOr404.middleware";
import { loginUserSchema } from "../schemas/user/loginUser.schema";
import { createUserSchema } from "../schemas/user/createUser.schema";
import { updateCourseSchema } from "../schemas/courses/updateCourse.schema";
import { createCourseSchema } from "../schemas/courses/createCourse.schema";
import { updateUserSchema } from "../schemas/user/updateUser.schema";
import getUserByIdOr404 from "../middlewares/getUserByIdOr404.middleware";
import validateEmailAvailability from "../middlewares/validateEmailAvailability.middleware";

const router = Router();

// Auth
router.post(
  "/register",
  validadeSchema(createUserSchema),
  validateEmailAvailability,
  userController.registerController
);
router.post(
  "/login",
  validadeSchema(loginUserSchema),
  userController.loginController
);

router.get(
  "/users/:id",
  validateAuthToken,
  getUserByIdOr404,
  userController.findUserByIdController
);
router.put(
  "/users/:id",
  validateAuthToken,
  getUserByIdOr404,
  validadeSchema(updateUserSchema),
  userController.updateUserController
);
router.delete(
  "/users/:id",
  validateAuthToken,
  getUserByIdOr404,
  userController.deleteUserController
);

// Public
router.get("/catalog", courseController.findActiveCoursesController);

// Protected
router.post(
  "/courses",
  validateAuthToken,
  validadeSchema(createCourseSchema),
  courseController.createCourseController
);
router.get(
  "/courses",
  validateAuthToken,
  courseController.findAllCoursesController
);
router.put(
  "/courses/:id",
  validateAuthToken,
  validadeSchema(updateCourseSchema),
  getCourseByIdOr404,
  courseController.updateCourseController
);
router.delete(
  "/courses/:id",
  validateAuthToken,
  getCourseByIdOr404,
  courseController.deleteCourseController
);

export default router;
