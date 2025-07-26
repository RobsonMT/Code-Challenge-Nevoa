import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const getUserByIdOr404 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  try {
    const { id } = req.params;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new Error();
    }

    req.user = user;

    next();
  } catch (err: any) {
    if (err instanceof Error) {
      return res.status(404).json({ error: "User not found" });
    }
  }
};

export default getUserByIdOr404;
