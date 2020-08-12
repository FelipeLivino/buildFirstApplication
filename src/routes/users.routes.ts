import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";

import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

import ensureAutheticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });

        delete user.password;

        return response.status(200).json(user);
    } catch (e) {
        return response.status(400).json({ error: e.message });
    }
});

usersRouter.patch(
    "/avatar",
    ensureAutheticated,
    upload.single("avatar"),
    async (request, response) => {
        try {
            const updateUserAvatar = new UpdateUserAvatarService();

            const user = await updateUserAvatar.execute({
                userId: request.user.id,
                avatarFileName: request.file.filename,
            });

            return response.json(user);
        } catch (e) {
            return response.status(400).json({ error: e.message });
        }
    },
);

export default usersRouter;
