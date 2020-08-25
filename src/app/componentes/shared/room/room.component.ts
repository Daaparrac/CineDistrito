import { Component, OnInit } from '@angular/core';
import { reservaModel } from '../../../models/reserva.model';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../../services/rest.service';
import { MoviesService } from '../../../services/movies.service';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  oculta = true;

  pelicula: any;
  reserva: reservaModel = new reservaModel();

  fecha: any;

  today = moment();
  man = moment(this.today).add(1, 'days');
  man_1 = moment(this.today).add(2, 'days');
  man_2 = moment(this.today).add(3, 'days');
  man_3 = moment(this.today).add(4, 'days');

  reservas: reservaModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _rest: RestService,
    private moviesService: MoviesService
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.moviesService
      .getPelicula(id)
      .subscribe((data) => (this.pelicula = data));
  }

  ngOnInit(): void { }

  selectFecha(fecha) {
    this.fecha = fecha.format('YYYY-MM-DD');
    this._rest
      .getAllReservas2(this.pelicula.title, this.fecha)
      .subscribe((rest) => {
        this.reservas = rest;
      });
  }

  save(silla) {
    this.reserva = silla;
    console.log(this.reserva)
    this.oculta = !this.oculta
  }

  guardar(form: NgForm) {
    if (form.invalid) {
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

    this.reserva.estado = "ocupado";
    this.reserva.fecha_reserva = moment().format();
    console.log(this.reserva)
    peticion = this._rest.PutReserva(this.reserva);


    peticion.subscribe(resp => {
      Swal.fire({
        title: 'Registrado Correctamente',
        icon: 'success',
        text: 'Se actualizo Correctamente',
      });

    });
  }
}
