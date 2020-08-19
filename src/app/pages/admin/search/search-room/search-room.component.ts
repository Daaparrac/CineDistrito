import { Component, OnInit } from '@angular/core';
import { SalasModel } from 'src/app/models/salas.model';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-search-room',
  templateUrl: './search-room.component.html',
  styleUrls: ['./search-room.component.scss']
})
export class SearchRoomComponent implements OnInit {

  salas: SalasModel[] = [];

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
    this._rest.getAllSalas().subscribe(res => this.salas = res);
  }

}
