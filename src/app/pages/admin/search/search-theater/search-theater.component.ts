import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { peliculasModel } from 'src/app/models/peliculas.model';
import { RestService } from 'src/app/services/rest.service';
import { TheaterModel } from 'src/app/models/theater.model';

@Component({
  selector: 'app-search-theater',
  templateUrl: './search-theater.component.html',
  styleUrls: ['./search-theater.component.scss']
})
export class SearchTheaterComponent implements OnInit {

  teatros : TheaterModel[] = [];

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
    this._rest.getAllTeatros().subscribe(res => this.teatros = res);
  }

}
