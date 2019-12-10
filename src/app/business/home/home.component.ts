import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuintosUtil } from 'src/app/commons/quintos.util';

@Component({
    selector: 'app-quintos-home',
    templateUrl: './home.component.html',
    providers: [ 
      
    ],
    styleUrls: ['./home.component.scss']
  })
export class HomeComponent {

  public nombre = "";
  public checkbox = false;

  public constructor(private router: Router, private modalService: NgbModal,
                     @Inject(LOCAL_STORAGE) private storage: WebStorageService) {

  }

  entrar(mensajeModal: any) {
    if (this.nombre.trim() !== '') {
      if (this.checkbox) {
        this.storage.set('quintos_usuario', this.nombre);
        this.router.navigate(['main']);
      } else {
        this.modalService.open(mensajeModal);
        QuintosUtil.mostrarMensaje('Debe aceptar los terminos y condiciones.');
      }
    } else {
      this.modalService.open(mensajeModal);
      QuintosUtil.mostrarMensaje('Ingrese su nombre');
    }
  }

  verCondiciones(condicionesModal: any) {
    this.modalService.open(condicionesModal);
  }

}