import { Component, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { QuintosService } from 'src/app/service/quintos.service';
import { QuintosUtil } from 'src/app/commons/quintos.util';
import { QuintosMensajeRequest } from 'src/app/service/request/quintos-mensaje.request';
import { QuintosFotoRequest } from 'src/app/service/request/quintos-foto.request';

@Component({
    selector: 'app-quintos-main',
    templateUrl: './main.component.html',
    providers: [ 
      QuintosService,
    ],
    styleUrls: ['./main.component.scss']
  })
export class MainComponent {

  public loading = false;
  public verMenu = true;
  public verFoto = false;
  public verMensaje = false;
  public verVideo = false;
  public verBoton = true;
  public mensaje = "";
  public usuario: string;
  public fotos: any[];

  public constructor(private modalService: NgbModal, private quintosService: QuintosService,
                     @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.usuario = this.storage.get('quintos_usuario');  
  }

  registrarMensaje(mensajeModal: any) {
    if (this.mensaje.trim() !== '') {
      this.loading = true;
      this.verBoton = false;
      const mensajeRequest = new QuintosMensajeRequest();
      mensajeRequest.mensaje = this.mensaje;
      mensajeRequest.usuario = this.usuario;
      this.quintosService.registrarMensaje(mensajeRequest).subscribe(
        data => {
          this.loading = false;
          this.verBoton = true;
          if (data.result) {
            this.irMenu();
          } else {
            console.log(data.message);
          }
        },
        error => {
          console.log(error);
          this.loading = false;
          this.verBoton = true;
        }
      );

    } else {
      this.modalService.open(mensajeModal);
      QuintosUtil.mostrarMensaje('Ingrese un mensaje');
    }
  }

  registrarFoto(mensajeModal: any) {
    if (this.fotos !== undefined) {
      const file = this.fotos[0];
      if (this.validarFoto(file.type)) {
        if (this.validarTamanioFoto(file.size)) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
              this.loading = true;
              this.verBoton = false;
              const fotoRequest= new QuintosFotoRequest();              
              fotoRequest.usuario = this.usuario;
              fotoRequest.foto = reader.result.toString();
              this.quintosService.registrarFoto(fotoRequest).subscribe(
                data => {
                  this.loading = false;
                  this.verBoton;
                  if (data.success) {                    
                    this.irMenu();
                  } else {
                    console.log(data.message);
                    this.modalService.open(mensajeModal);
                    QuintosUtil.mostrarMensaje('No se pudo enviar la imagen.');
                  }                             
                },
                error => {
                  console.log(error);
                  this.modalService.open(mensajeModal);
                  QuintosUtil.mostrarMensaje('No se pudo enviar la imagen.');
                  this.loading = false;
                  this.verBoton = true;
                }
              );
          };
        } else {
          this.modalService.open(mensajeModal);
          QuintosUtil.mostrarMensaje('Debes subir una foto con tamaño maximo de 1 Mb.'); 
        }
      } else {
        this.modalService.open(mensajeModal);
        QuintosUtil.mostrarMensaje('Debes subir una foto en formato JPEG o PNG');
      }
    } else {
      this.modalService.open(mensajeModal);
      QuintosUtil.mostrarMensaje('Debe seleccionar o tomar una foto.');
    }
  }

  onFotoChange(event: any) {
    this.fotos = event.target.files;
  }

  validarFoto(type: string): boolean {
    let esFoto = false;
    const strs = type.split('/');
    if (strs[1] === 'jpeg' || strs[1] === 'png' || strs[1] === 'jpg') {
      esFoto = true;
    }
    return esFoto;
  }

  validarTamanioFoto(size: number): boolean {
    if (size > 1000000) {
      return false;
    } else {
      return true;
    }    
  } 

  irFoto() {
    this.verMenu = false;
    this.verFoto = true;
  }

  irMensaje() {
    this.verMenu = false;
    this.verMensaje = true;
  }

  irVideo() {
    this.verMenu = false;
    this.verVideo = true;
  }

  irMenu() {
    this.verMenu = true;
    this.verMensaje = false;
    this.verFoto = false;
    this.verVideo = false;
  }

}
