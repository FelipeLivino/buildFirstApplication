import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";
import { injectable, inject } from "tsyringe";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";

import uploadConfig from "@config/upload";
import User from "@modules/users/infra/typeorm/entities/User";

interface IRequest {
    userId: string;
    avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
    ) {}

    public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new AppError(
                "Only authenticated users can change avatar",
                401,
            );
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directoey,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;
        await this.userRepository.save(user);

        delete user.password;
        return user;
    }
}
export default UpdateUserAvatarService;
