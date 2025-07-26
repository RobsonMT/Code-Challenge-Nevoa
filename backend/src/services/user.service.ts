import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { userWithoutPassword } from "../utils";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  registerService = async (req: Request) => {
    const newUser = await this.userRepo.save(req.body);
    return userWithoutPassword(newUser);
  };

  loginService = async (req: Request) => {
    const foundUser = await this.userRepo.findOneBy({
      email: req.body.email.toLowerCase(),
    });

    if (!foundUser) {
      return { status: 403, message: { message: "Wrong email/password." } };
    }

    if (!(await foundUser.comparePwd(req.body.password))) {
      return { status: 403, message: { message: "Wrong email/password." } };
    }

    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "1h",
      }
    );

    return { status: 200, message: { token } };
  };

  updateService = async ({ user, body }: Request) => {
    await this.userRepo.update(user.id, { ...body });
    return userWithoutPassword({ ...user, ...body });
  };

  deleteService = async ({ user }: Request) => {
    await this.userRepo.delete(user.id);
    return userWithoutPassword(user);
  };
}

export default new UserService();
