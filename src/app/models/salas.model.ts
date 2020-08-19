import { TheaterModel } from './theater.model';
import { peliculasModel } from './peliculas.model';

export class SalasModel{
    id_sala: string;
    codigo_sala: string;
    teatro: TheaterModel;
}