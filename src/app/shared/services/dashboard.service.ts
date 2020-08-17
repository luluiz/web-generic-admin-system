import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../authentication/authentication.service';
import { ErrorHandlerService } from './errorHandler.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private readonly API = environment.API;

    constructor(
        private http: HttpClient,
        private authService: AuthenticationService,
        private errorHandlerService: ErrorHandlerService,
    ) { }

    getNCadastros(): Observable<any> {
        return this.http.get(this.API + 'dashboard/n_cadastros')
            .pipe(timeout(environment.http_timeout), catchError(erro => this.errorHandlerService.handler(erro)));
    }

    getTotalCotacoes(): Observable<any> {
        return this.http.get(this.API + 'cotacao/total_cotacoes/' + this.authService.getIdOficina())
            .pipe(timeout(environment.http_timeout), catchError(erro => this.errorHandlerService.handler(erro)));
    }

    getEconomia(filtro: string): Observable<any> {
        return this.http.get(this.API + 'cotacao/economia/' + this.authService.getIdOficina() + '/' + filtro)
            .pipe(timeout(environment.http_timeout), catchError(erro => this.errorHandlerService.handler(erro)));
    }

    getTotalVendido(filtro: string): Observable<any> {
        return this.http.get(this.API + 'pedido/total_vendido/' + this.authService.getIdFornecedor() + '/' + filtro)
            .pipe(timeout(environment.http_timeout), catchError(erro => this.errorHandlerService.handler(erro)));
    }

    // testeSinesp() {
    //     return this.http.get(this.API + 'sinesp_api/NNS6061')
    // .pipe(timeout(environment.http_timeout), catchError(erro => this.errorHandlerService.handler(erro)));
    // }
}
