import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import AppError from "@shared/errors/AppError";

import uploadConfig from "@config/upload";
import User from "@modules/users/infra/typeorm/entities/User";

interface Request {
    userId: string;
    avatarFileName: string;
}
class UpdateUserAvatarService {
    public async execute({ userId, avatarFileName }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(userId);

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
        await userRepository.save(user);

        delete user.password;
        return user;
    }
}
export default UpdateUserAvatarService;
