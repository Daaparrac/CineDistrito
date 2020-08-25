import { Component, OnInit } from '@angular/core';
import { TheaterModel } from '../../../models/theater.model';
import { RestService } from '../../../services/rest.service';
import { HorarioModel } from '../../../models/horario.model';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent implements OnInit {

  teatro: TheaterModel[] = [];
  horarios: HorarioModel[] = [];
  constructor( private _rest: RestService) { }

  ngOnInit(): void {
    this._rest.getAllTeatros().subscribe((res) => this.teatro = res);
    this._rest.getAllHorarios().subscribe((res) => {this.horarios = res
    console.log(res)
    });
  }

}
