import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { peliculasModel } from '../models/peliculas.model';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }


  getPelicula(id: string){
    return this.http.get(`${ environment.url }/Peliculas/${ id}.json`);
  }

  getMovies(){
    return this.http.get(`${environment.url}/Peliculas.json`).pipe(
      map( this.crearArregloPeliculas ));
  }

  private crearArregloPeliculas( pelicula: object ){
    const peliculas: peliculasModel[] = [];
    if (pelicula === null){
      return [];
    }

    Object.keys(pelicula).forEach(key => {
      const peliculas2: peliculasModel = pelicula[key];
      peliculas2.id_pelicula = key;
      peliculas.push(peliculas2);
    });
    return peliculas;
  }

}
