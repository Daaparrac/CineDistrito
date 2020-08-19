import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map} from 'rxjs/operators';
import { peliculasModel } from '../models/peliculas.model';
import { TheaterModel } from '../models/theater.model';
import { HorarioModel } from '../models/horario.model';
import { SalasModel } from '../models/salas.model';
import { reservaModel } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  putPelicula(pelicula: peliculasModel){
    const PeliculaTemp = {
      ...pelicula
    };
    delete PeliculaTemp.id_pelicula;
    return this.http.put(`${ environment.url }/Peliculas/${ pelicula.id_pelicula }.json`, PeliculaTemp);
  }

  postPelicula(pelicula: peliculasModel){
    return this.http.post(`${ environment.url }/Peliculas.json`, pelicula).pipe(
      map ( (resp: any) => {
        pelicula.id_pelicula = resp.name;
        return pelicula;
      } )
    );
  }

  getAllReservas2(nombre_pelicula, fecha){
    return this.http.get(`${ environment.url }/reservas.json`).pipe(
      map( res => this.crearArregloReserva2(res, nombre_pelicula, String(fecha))));
  }

  getReserva2(id: string){
    return this.http.get(`${ environment.url }/reservas/${ id }.json`);
  }

  getAllTeatros(){
    return this.http.get(`${ environment.url }/teatro.json`).pipe(
      map( this.crearArregloTeatro ));
  }

  getAllHorarios(){
    return this.http.get(`${ environment.url }/horarios.json`).pipe(
    map ( this.crearArregloHorarios ))
  }

  getAllReservas(){
    return this.http.get(`${ environment.url }/reservas.json`).pipe(
      map( this.crearArregloReserva ));
  }

  getReserva(id: string){
    return this.http.get(`${ environment.url }/reservas/${ id }.json`);
  }

  getHorario(id: string){
    return this.http.get(`${ environment.url }/horarios/${ id }.json`);
  }

  getTeatro(id: string){
    return this.http.get(`${ environment.url }/teatro/${ id }.json`);
  }

  getAllSalas(){
    return this.http.get(`${ environment.url }/salas.json`).pipe(
  map ( this.crearArregloSalas ))
  }

  getSala(id: string){
    return this.http.get(`${ environment.url }/salas/${ id }.json`);
  }

  PutTeatro(teatro : TheaterModel){
    const teatroTemp = {
      ...teatro
    };
    delete teatroTemp.id_teatro;
    return this.http.put(`${ environment.url }/teatro/${ teatro.id_teatro }.json`, teatroTemp);
  }

  PutSala(sala: SalasModel){
    const salaTemp = {
      ...sala
    };
    delete salaTemp.id_sala;
    return this.http.put(`${ environment.url }/salas/${ sala.id_sala }.json`, salaTemp);
  }

  putHorario(horario: HorarioModel){
    const horarioTemp = {
      ...horario
    };
    delete horarioTemp.id_horario;
    return this.http.put(`${ environment.url }/horarios/${ horario.id_horario }.json`, horarioTemp);
  }

  PutReserva(reserva : reservaModel){
    const reservaTemp = {
      ...reserva
    };
    delete reservaTemp.id_reserva;
    return this.http.put(`${ environment.url }/reservas/${ reserva.id_reserva }.json`, reservaTemp);
  }


  PostTeatro(teatro : TheaterModel){
    return this.http.post(`${ environment.url }/teatro.json`, teatro).pipe(
      map( (resp: any) => {
        teatro.id_teatro = resp.name;
        return teatro;
      })
    );
  }

  PostReserva(reserva : reservaModel){
    return this.http.post(`${ environment.url }/reservas.json`, reserva).pipe(
      map( (resp: any) => {
        reserva.id_reserva = resp.name;
        return reserva;
      })
    );
  }

  PostHorario(horario: HorarioModel){
    return this.http.post(`${ environment.url }/horarios.json`, horario).pipe(
      map ( (resp: any) => {
        horario.id_horario = resp.name;
        return horario;
      } )
    );
  }

  PostSala(sala: SalasModel){
    return this.http.post(`${ environment.url }/salas.json`, sala).pipe(
      map ( (resp: any) => {
        sala.id_sala = resp.name;
        return sala;
      } )
    );
  }

  private crearArregloTeatro( teatro: object){
    const teatros: TheaterModel[] = [];
    if( teatro === null){
      return [];
    }
    Object.keys(teatro).forEach( key => {
      const teatro2: TheaterModel = teatro[key];
      teatro2.id_teatro = key;
      teatros.push(teatro2);
    });
    return teatros;
  }
  
  private crearArregloSalas( sala: object ){
    const salas: SalasModel[] = [];
    if (sala === null){
      return [];
    }
    Object.keys(sala).forEach(key => {
      const sala2: SalasModel = sala[key];
      sala2.id_sala = key;
      salas.push(sala2);
    });
    return salas;
  }

  private crearArregloHorarios( horario: object ){
    const horarios: HorarioModel[] = [];
    if (horario === null){
      return [];
    }
    Object.keys(horario).forEach(key => {
      const horario2: HorarioModel = horario[key];
      horario2.id_horario = key;
      horarios.push(horario2);
    });
    return horarios;
  }

  private crearArregloReserva(reserva: object){
    const reservas: reservaModel[] = [];
    if( reserva === null){
      return [];
    }
    Object.keys(reserva).forEach( key => {
      const reserva2: reservaModel = reserva[key];
      reserva2.id_reserva = key;
      reservas.push(reserva2);
    });
    return reservas;
  }

  private crearArregloReserva2(reserva: object, nombre_pelicula, fecha){
    const reservas: reservaModel[] = [];
    if( reserva === null){
      return [];
    }
    Object.keys(reserva).forEach( key => {
      const reserva2: reservaModel = reserva[key];
      reserva2.id_reserva = key;
      reservas.push(reserva2);
    });
    const resultPosts = [];
    for (const post of reservas) {
      if (post.horario.pelicula.title.toLowerCase().indexOf(nombre_pelicula.toLowerCase()) > -1) {
        if (post.horario.fecha.toLowerCase().indexOf(fecha.toLowerCase()) > -1) {
          resultPosts.push(post);
        }
      };
    };
    return resultPosts;
  }
}
