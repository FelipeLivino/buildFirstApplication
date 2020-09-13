import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import User from "@modules/users/infra/typeorm/entities/User";

import AppError from "@shared/errors/AppError";

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const checkUserExit = await userRepository.findOne({
            where: { email },
        });
        if (checkUserExit) {
            throw new AppError("Email address already used.");
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;