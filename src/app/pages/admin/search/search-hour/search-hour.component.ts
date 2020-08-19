import { Component, OnInit } from '@angular/core';
import { HorarioModel } from 'src/app/models/horario.model';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-search-hour',
  templateUrl: './search-hour.component.html',
  styleUrls: ['./search-hour.component.scss'],
})
export class SearchHourComponent implements OnInit {
  horarios: HorarioModel[] = [];

  constructor(private _rest: RestService) {}

  ngOnInit(): void {
    this._rest.getAllHorarios().subscribe((res) => (this.horarios = res));
  }

  update(item: HorarioModel) {
    if (item.estado == 'Desactivado') {
      item.estado = 'Activo';
    } else {
      item.estado = 'Desactivado';
    }
    Swal.fire({
      title: 'Espere',
      icon: 'info',
      text: 'Guardando información',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    peticion = this._rest.putHorario(item);

    peticion.subscribe((resp) => {
      Swal.fire({
        title: 'Actualizado',
        icon: 'success',
        text: 'Se actualizo Correctamente',
      });
    });
  }
}
