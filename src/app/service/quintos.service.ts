import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuintosFotoRequest } from './request/quintos-foto.request';
import { QuintosFotoResponse } from './response/quintos-foto.response';
import { QuintosResultResponse } from './response/quintos-result.response';
import { QuintosEndpoint } from '../commons/quintos.endpoint';
import { QuintosMensajeRequest } from './request/quintos-mensaje.request';
import { QuintosMensajeResponse } from './response/quintos-mensaje.response';

@Injectable()
export class QuintosService {

    private headers: HttpHeaders;

    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders();
    }


    registrarFoto(fotoRequest: QuintosFotoRequest): Observable<QuintosResultResponse<QuintosFotoResponse>> {
        return this.httpClient.post<QuintosResultResponse<QuintosFotoResponse>>(QuintosEndpoint.API_REGISTRAR_FOTO, fotoRequest,
            { headers: this.headers});
    }

    registrarMensaje(mensajeRequest: QuintosMensajeRequest): Observable<QuintosResultResponse<QuintosMensajeResponse>> {
        return this.httpClient.post<QuintosResultResponse<QuintosMensajeResponse>>(QuintosEndpoint.API_REGISTRAR_MENSAJE, mensajeRequest,
            { headers: this.headers});
    }

}