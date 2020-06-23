import { isEqual } from "date-fns";
import Appointment from "../models/Appointment";

interface CreateAppointmentDTO {
    date: Date;
    provider: string;
}

class AppointmentsRepositories {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });
        this.appointments.push(appointment);
        return appointment;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );

        return findAppointment || null;
    }

    public getAll(): Appointment[] {
        return this.appointments;
    }
}

export default AppointmentsRepositories;
