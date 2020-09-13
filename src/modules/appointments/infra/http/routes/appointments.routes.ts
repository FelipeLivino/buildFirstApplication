/* eslint-disable camelcase */
import { Router } from "express";
import { parseISO } from "date-fns";

import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepositories";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const appointmentRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post("/", async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const CreateAppointment = new CreateAppointmentService(
        appointmentsRepository,
    );

    const appointment = await CreateAppointment.execute({
        provider_id,
        date: parsedDate,
    });

    return response.status(200).json(appointment);
});

// appointmentRouter.get("/", async (request, response) => {
//     const appointments = await appointmentsRepository.find();
//     return response.json(appointments);
// });

export default appointmentRouter;
