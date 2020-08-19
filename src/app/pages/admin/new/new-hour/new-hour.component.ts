import { Component, OnInit } from '@angular/core';
import { HorarioModel } from 'src/app/models/horario.model';
import { SalasModel } from 'src/app/models/salas.model';
import { RestService } from 'src/app/services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { peliculasModel } from 'src/app/models/peliculas.model';
import { MoviesService } from 'src/app/services/movies.service';
import { reservaModel } from 'src/app/models/reserva.model';
@Component({
  selector: 'app-new-hour',
  templateUrl: './new-hour.component.html',
  styleUrls: ['./new-hour.component.scss']
})
export class NewHourComponent implements OnInit {

  error = false;
  horario: HorarioModel = new HorarioModel();
  reserva: reservaModel = new reservaModel();
  id = null;

  sala: SalasModel[] = [];
  sala2: SalasModel = new SalasModel();
  pelicula: peliculasModel[] = [];
  pelicula2: peliculasModel = new peliculasModel();

  selectedItem: string;

  constructor(private _rest: RestService, private _activatedRoute: ActivatedRoute, private _movies: MoviesService) { }

  ngOnInit(): void {

    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.id = id;

    if( id != 'new'){
      this._rest.getHorario(id).subscribe( (res : HorarioModel) =>{
          this.horario = res;
          this.horario.id_horario = id;
      });
    }

    if( id == 'new'){
      this.horario.id_horario = null;
    }

    // Esto carga las cosas
    this._rest.getAllSalas().subscribe(rest => this.sala = rest);
    this._movies.getMovies().subscribe(rest => this.pelicula = rest);

  }

  guardar(form: NgForm){

    this.horario.estado = "Activo";
    this.horario.sala = this.sala2;
    this.horario.pelicula = this.pelicula2;

    if(form.invalid ){
      this.error = true;
      return;
    }

    Swal.fire({
      title: 'Espere',
      icon: 'info',
      text: 'Guardando información',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;
  
    if(this.horario.id_horario){
      //this.error = false;
      //peticion = this._rest.putHorario(this.horario); // NO SE PUEDE ACTUALIZAR 
    } else {
      this.error = false;
      peticion = this._rest.PostHorario(this.horario);
      for (let index = 0; index < 20; index++) {
        this.reserva.estado = "Disponible";
        this.reserva.horario = this.horario;
        this.reserva.silla_tipo = "Preferencial";
        this.reserva.silla = `SILLA-P${index}`
        this._rest.PostReserva(this.reserva).subscribe( res =>{
        });
      }
      for (let index = 0; index < 40; index++) {
        this.reserva.estado = "Disponible";
        this.reserva.horario = this.horario;
        this.reserva.silla_tipo = "General";
        this.reserva.silla = `SILLA-G${index}`
        this._rest.PostReserva(this.reserva).subscribe( res =>{
        });
      }
    }

    peticion.subscribe(resp =>{
      Swal.fire({
        title: this.horario.pelicula.title + " - " + this.horario.hora,
        icon: 'success',
        text: 'Se actualizo Correctamente',
      });
    });
  
  }

  selectSala(sala: any){
    this.sala2 = sala;
  }

  selectPelicula(pelicula: any){
    this.pelicula2 = pelicula;
  }

}
  
