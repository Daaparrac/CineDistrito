import { HorarioModel } from './horario.model';

export class reservaModel{
    id_reserva: string;
    documento_usuario: string;
    nombre: string;
    silla: string;
    silla_tipo: string;
    fecha_reserva: string;
    admin: string;
    estado: string;
    horario: HorarioModel;
}