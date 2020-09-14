/* eslint-disable camelcase */
import { Router } from "express";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import AppointmentController from "@modules/appointments/infra/http/controllers/AppointmentController";

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post("/", appointmentController.create);

// appointmentRouter.get("/", async (request, response) => {
//     const appointments = await appointmentsRepository.find();
//     return response.json(appointments);
// });

export default appointmentRouter;
