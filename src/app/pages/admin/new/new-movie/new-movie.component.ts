import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { peliculasModel } from 'src/app/models/peliculas.model';
import { RestService } from 'src/app/services/rest.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss']
})
export class NewMovieComponent implements OnInit {

  id = null;

  pelicula : peliculasModel = new peliculasModel();

  constructor(private _rest: RestService, private _activatedRoute : ActivatedRoute, private _movie: MoviesService) { }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.id = id;
    if( id != 'new'){
      this._movie.getPelicula(id).subscribe( (res : peliculasModel) =>{
          this.pelicula = res;
          this.pelicula.id_pelicula = id;
      });
    }
    if( id == 'new'){
      this.pelicula.id_pelicula = null;
    }
  }

  guardar(form: NgForm){
    if(form.invalid ){
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
  
    if( this.pelicula.id_pelicula){
      peticion = this._rest.putPelicula(this.pelicula);
    }else{
      peticion = this._rest.postPelicula(this.pelicula);
    }

    peticion.subscribe(resp =>{
      Swal.fire({
        title: 'Registrado',
        icon: 'success',
        text: 'Se actualizo Correctamente',
      });
    });
    
}

}
