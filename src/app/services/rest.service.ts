import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map} from 'rxjs/operators';
import { peliculasModel } from '../models/peliculas.model';

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
}
