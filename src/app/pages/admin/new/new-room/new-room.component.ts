import { Component, OnInit } from '@angular/core';
import { SalasModel } from 'src/app/models/salas.model';
import { RestService } from 'src/app/services/rest.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { TheaterModel } from 'src/app/models/theater.model';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent implements OnInit {

  error = false;
  sala: SalasModel = new SalasModel();
  id = "";
  teatro: TheaterModel[] = [];
  teatro2: TheaterModel = new TheaterModel();
  selectedItem: string;

  constructor(private _rest : RestService, private _activatedRoute : ActivatedRoute) {  }

  ngOnInit(): void {

    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.id = id;

    if( id != 'new'){
      this._rest.getSala(id).subscribe( (res : SalasModel) =>{
          this.sala = res;
          this.sala.id_sala = id;
      });
    }

    if( id == 'new'){
      this.sala.id_sala = "";
    }

    this._rest.getAllTeatros().subscribe(rest => this.teatro = rest);

  }

  guardar(form: NgForm){
    this.sala.teatro = this.teatro2;
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
  
    if( this.sala.id_sala){
      this.error = false;
      peticion = this._rest.PutSala(this.sala);
    }else{
      this.error = false;
      peticion = this._rest.PostSala(this.sala);
    }

    peticion.subscribe(resp =>{
      Swal.fire({
        title: this.sala.codigo_sala,
        icon: 'success',
        text: 'Se actualizo Correctamente',
      });
    });
}
selectTeatro(id_teatro: any){
  this._rest.getTeatro(id_teatro.target.value).subscribe( ( rest: TheaterModel ) => {this.teatro2 = rest} )
}

}
