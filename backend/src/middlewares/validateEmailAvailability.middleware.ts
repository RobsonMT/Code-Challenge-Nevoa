import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const validateEmailAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  if (req.body.email) {
    const foundUser = await userRepository.findOneBy({
      email: req.body.email.toLowerCase(),
    });

    if (foundUser) {
      return res.status(409).json({ error: "E-mail already registered" });
    }
  }

  next();
};

export default validateEmailAvailability;
