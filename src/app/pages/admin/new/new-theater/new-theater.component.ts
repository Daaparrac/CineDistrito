import { Component, OnInit } from '@angular/core';
import { TheaterModel } from 'src/app/models/theater.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import * as moment from 'moment';

@Component({
  selector: 'app-new-theater',
  templateUrl: './new-theater.component.html',
  styleUrls: ['./new-theater.component.scss']
})
export class NewTheaterComponent implements OnInit {

  id = null;

  teatro: TheaterModel = new TheaterModel();

  constructor(private _rest: RestService, private _activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.id = id;
    if( id != 'new'){
      this._rest.getTeatro(id).subscribe( (res : TheaterModel) =>{
          this.teatro = res;
          this.teatro.id_teatro = id;
      });
    }
    if( id == 'new'){
      this.teatro.id_teatro = null;
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
    this.teatro.fecha_creacion = moment().format();
    if( this.teatro.id_teatro){
      peticion = this._rest.PutTeatro(this.teatro);
    }else{
      peticion = this._rest.PostTeatro(this.teatro);
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
