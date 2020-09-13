import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

import CreateUserService from "@modules/users/services/CreateUserService";
import UpdateUserAvatarService from "@modules/users//services/UpdateUserAvatarService";

import ensureAutheticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.status(200).json(user);
});

usersRouter.patch(
    "/avatar",
    ensureAutheticated,
    upload.single("avatar"),
    async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            userId: request.user.id,
            avatarFileName: request.file.filename,
        });

        return response.json(user);
    },
);

export default usersRouter;
