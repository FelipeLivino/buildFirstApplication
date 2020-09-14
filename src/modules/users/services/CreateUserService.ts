import { hash } from "bcryptjs";
import User from "@modules/users/infra/typeorm/entities/User";
import { injectable, inject } from "tsyringe";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import AppError from "@shared/errors/AppError";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
    ) {}

    async execute({ name, email, password }: IRequest): Promise<User> {
        const checkUserExit = await this.userRepository.findByEmail(email);
        if (checkUserExit) {
            throw new AppError("Email address already used.");
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
