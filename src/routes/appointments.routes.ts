import { Router } from "express";
import { parseISO } from "date-fns";

import AppointmentsRepository from "../repositories/AppointmentsRepositories";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentRouter.post("/", (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const CreateAppointment = new CreateAppointmentService(
            appointmentsRepository,
        );

        const appointment = CreateAppointment.execute({
            provider,
            date: parsedDate,
        });

        return response.status(200).json(appointment);
    } catch (e) {
        return response.status(400).json({ error: e.message });
    }
});

appointmentRouter.get("/", (request, response) => {
    return response.json(appointmentsRepository.getAll());
});

export default appointmentRouter;
