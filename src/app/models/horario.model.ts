import { SalasModel } from './salas.model';
import { peliculasModel } from './peliculas.model';

export class HorarioModel{
    id_horario: string;
    hora: string;
    sala: SalasModel;
    pelicula: peliculasModel;
    fecha: string;
    estado: string;
}