/* eslint-disable camelcase */
import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateUserAvatarService from "@modules/users//services/UpdateUserAvatarService";

class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            userId: request.user.id,
            avatarFileName: request.file.filename,
        });

        return response.json(user);
    }
}

export default UserAvatarController;
