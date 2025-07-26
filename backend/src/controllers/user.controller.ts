import { Request, Response } from "express";
import userService from "../services/user.service";
import { userWithoutPassword } from "../utils";

class UserController {
  registerController = async (req: Request, res: Response) => {
    const user = userService.registerService(req);
    res.status(201).json(user);
  };

  loginController = async (req: Request, res: Response) => {
    const { status, message } = await userService.loginService(req);
    return res.status(status).json(message);
  };

  findUserByIdController = async (req: Request, res: Response) => {
    return res.status(200).json(userWithoutPassword(req.user));
  };

  updateUserController = async (req: Request, res: Response) => {
    const updatedCourse = await userService.updateService(req);
    return res.status(200).json(updatedCourse);
  };

  deleteUserController = async (req: Request, res: Response) => {
    const deletedCourse = await userService.deleteService(req);
    return res.status(204).send();
  };
}

export default new UserController();
