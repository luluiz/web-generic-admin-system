import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from '../shared/services/errorHandler.service';
import { UtilsService } from '../shared/services/utils.service';
import { SwalService } from '../shared/swal.service';
import { ToastService } from '../shared/toast.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private readonly API = environment.API;
    public usuario = new BehaviorSubject<any>({});
    public _usuario = this.usuario.asObservable();
    public empresa = new BehaviorSubject<any>({});
    public _empresa = this.empresa.asObservable();

    private _iat = new BehaviorSubject<number>(null);
    private _exp = new BehaviorSubject<number>(null);
    public iat = this._iat.asObservable();
    public exp = this._exp.asObservable();

    public _counter: number = 0;
    private _timer: Observable<number>;
    private _timerSubscription: Subscription;

    constructor(
        private http: HttpClient,
        private router: Router,
        private jwtService: JwtHelperService,
        private swal: SwalService,
        private toast: ToastService,
        private utils: UtilsService,
        private errorHandlerService: ErrorHandlerService
    ) {
        this.refreshExpireSession();
    }

    login(credenciais: { email: string, senha: string }): Observable<any> {
        // console.log(credenciais);
        return this.http.post<any>(this.API + 'login', credenciais)
            .pipe(timeout(environment.http_timeout), catchError(erro => this.errorHandlerService.handler(erro)));
    }

    validarTokenAtivacao(token: string): Observable<any> {
        return this.http.post<any>(this.API + 'ativacao/ativar', { token: token })
            .pipe(timeout(environment.http_timeout), catchError(erro => this.errorHandlerService.handler(erro)));
    }

    reenviarAtivacao(usuario): Observable<any> {
        return this.http.post<any>(this.API + 'ativacao/reenviar', usuario)
            .pipe(timeout(environment.http_timeout), catchError(erro => this.errorHandlerService.handler(erro)));
    }

    logout() {
        this.swal.show('question', 'Deseja finalizar sua sessão?').then(_v => {
            if (_v.value) {
                this.resetToken();
                window.sessionStorage.clear();
                this.router.navigate(['/auth/login']);
            }
        });
    }

    setUsuario(usuario) {
        this.usuario.next(usuario);
    }

    setEmpresa(empresa) {
        this.empresa.next(empresa);
    }

    setIat(iat: number) {
        this._iat.next(iat);
    }

    setExp(exp: number) {
        this._exp.next(exp);
    }

    setToken(token: any): any {
        if (!token)
            window.sessionStorage.removeItem('token');
        else {
            window.sessionStorage.setItem('token', token);

            let usuario = this.getUsuarioLogado();
            this.setUsuario(usuario);
            this.setEmpresa(this.getEmpresa(usuario));
            this.refreshExpireSession();
        }
    }

    refreshExpireSession() {
        const exp_iat = this.getExpIat();
        if (exp_iat) {
            this.setExp(exp_iat.exp);
            this.setIat(exp_iat.iat);
            this.startCounter();
        }
    }

    getToken(): any {
        const token = window.sessionStorage.getItem('token');
        return token ? token : null;
    }

    getTokenDecoded(): any {
        let token;
        try {
            token = this.getToken();
            return token ? this.jwtService.decodeToken(token) : null;
        } catch (erro) {
            if (token) console.warn('Falha de autenticação: Token inexistente.');
            else console.error('Não foi possível decodificar o token:', erro);
            this.swal.showOk('warn', 'Falha de autenticação', 'Token não reconhecido');
        }
    }

    resetToken(): any {
        if (this.getToken()) window.sessionStorage.removeItem('token');
    }

    verificaAutenticacao(): number {
        const token = this.getToken();

        if (token && !this.jwtService.isTokenExpired(token))
            return 3;   // Token válido.
        else if (token && this.jwtService.isTokenExpired(token))
            return 2;   // Token expirado.
        else return 1;  // Não há registro de token.
    }

    verificarAcessoComTelaBloqueio(): boolean {
        if (this.verificaAutenticacao() == 3) { // Autenticado com token válido
            return true;
        } else if (this.verificaAutenticacao() == 2) {	// Autenticado com token expirado
            this.router.navigate(['/auth/bloqueio']);
            return false;
        } else if (this.verificaAutenticacao() == 1) {	// Não autenticado
            this.router.navigate(['/auth/login']);
            return false;
        }
    }

    isTokenExpirado(): boolean {
        const token = this.getToken();
        return token && !this.jwtService.isTokenExpired(token);
    }

    getTokenExpirationDate(token): Date {
        return this.jwtService.getTokenExpirationDate(token);
    }

    loginFornecedor(usuario?) {
        let status_cadastro: string = this.getStatusCadastro(usuario);
        let financeiro_quitado: boolean = this.isFinanceiroPendente(usuario);

        if (status_cadastro == 'PENDENTE' || status_cadastro == 'FINALIZADO') {
            this.toast.show('success', 'Login efetuado com sucesso.');
            this.router.navigate(['/perfil/cadastro']);
        } else if (status_cadastro == 'INATIVO') {
            this.swal.showOk('warning', 'Cadastro Inativo', 'Entre em contato com o Hubbi para verificar a inatividade do cadastro.')
        } else if (!financeiro_quitado)
            this.swal.showOk('warning', 'Financeiro Pendente', 'Entre em contato com o Hubbi para quitar a pendência.')
        else if (financeiro_quitado && status_cadastro == 'ATIVO') {
            this.toast.show('success', 'Login efetuado com sucesso.');
            this.router.navigate(['/dashboards/dashboard-fornecedor']);
        }
    }

    loginOficina(usuario?) {
        let status_cadastro: string = this.getStatusCadastro(usuario);
        let financeiro_quitado: boolean = this.isFinanceiroPendente(usuario);

        if (status_cadastro == 'PENDENTE' || status_cadastro == 'FINALIZADO') {
            this.toast.show('success', 'Login efetuado com sucesso.');
            this.router.navigate(['/perfil/cadastro']);
        } else if (status_cadastro == 'INATIVO') {
            this.swal.showOk('warning', 'Cadastro Inativo', 'Entre em contato com o Hubbi para verificar a inatividade co cadastro.')
        } else if (!financeiro_quitado)
            this.swal.showOk('warning', 'Financeiro Pendente', 'Entre em contato com o Hubbi para quitar a pendência.')
        else {
            this.toast.show('success', 'Login efetuado com sucesso.');
            this.router.navigate(['/dashboards/dashboard-fornecedor']);
        }
    }

    loginAdmin() {
        this.toast.show('success', 'Login efetuado com sucesso.');
        this.router.navigate(['/dashboards/dashboard-admin']);
    }

    getExpIat() {
        const token_decoded = this.getTokenDecoded();
        return token_decoded ? { iat: token_decoded.iat, exp: token_decoded.exp } : null
    }

    getUsuarioLogado(): any {
        const token_decoded = this.getTokenDecoded();
        return token_decoded ? token_decoded.usuario : null
    }

    getOficina() {
        let token_decoded = this.getTokenDecoded();
        return token_decoded ? token_decoded.oficina : null;
    }

    getFornecedor() {
        let token_decoded = this.getTokenDecoded();
        return token_decoded ? token_decoded.fornecedor : null;
    }

    getIdEmpresa() {
        try {
            return this.getEmpresa()._id;
        } catch (erro) { return null; }
    }

    getIdOficina() {
        try {
            return this.getOficina()._id;
        } catch (erro) { return null; }
    }

    getIdFornecedor() {
        try {
            return this.getFornecedor()._id;
        } catch (erro) { return null; }
    }

    isAdmin(): boolean {
        const usuario = this.getUsuarioLogado();
        return usuario ? usuario.nivel == 'ADMIN' : false;
    }

    isSuporte(): boolean {
        const usuario = this.getUsuarioLogado();
        return usuario ? usuario.nivel == 'SUPORTE' : false;
    }

    isUsuarioFornecedor(): boolean {
        const usuario = this.getUsuarioLogado();
        return usuario ? usuario.is_fornecedor : false;
    }

    isUsuarioOficina(): boolean {
        const usuario = this.getUsuarioLogado();
        return usuario ? usuario.is_oficina : false;
    }

    /**
     * Retorna o status_cadastro referente ao formulário de registro.
     * @param usuario 
     */
    getStatusCadastro(usuario?: any): string {
        if (!usuario) usuario = this.getUsuarioLogado();

        let empresa;
        if (usuario.is_fornecedor) empresa = this.getFornecedor();
        else if (usuario.is_oficina) empresa = this.getOficina();

        return empresa && empresa.status_cadastro;
    }

    isCadastroAutorizado(usuario?: any): boolean {
        if (!usuario) usuario = this.getUsuarioLogado();

        let empresa;
        if (usuario.is_fornecedor) empresa = this.getFornecedor();
        else if (usuario.is_oficina) empresa = this.getOficina();

        return empresa && empresa.status_cadastro == 'ATIVO';
    }

    isCadastroPendente(usuario?): boolean {
        if (!usuario) usuario = this.getUsuarioLogado();

        let empresa;
        if (usuario.is_fornecedor) empresa = this.getFornecedor();
        else if (usuario.is_oficina) empresa = this.getOficina();
        return empresa && empresa.status_cadastro == 'PENDENTE';
    }

    isCadastroFinalizado(usuario?): boolean {
        if (!usuario) usuario = this.getUsuarioLogado();

        let empresa;
        if (usuario.is_fornecedor) empresa = this.getFornecedor();
        else if (usuario.is_oficina) empresa = this.getOficina();
        return empresa && empresa.status_cadastro == 'FINALIZADO';
    }

    isFinanceiroPendente(usuario?): boolean {
        if (!usuario) usuario = this.getUsuarioLogado();

        let empresa;
        if (usuario.is_fornecedor) empresa = this.getFornecedor();
        else if (usuario.is_oficina) empresa = this.getOficina();
        return empresa && empresa.financeiro && empresa.financeiro.status === 'QUITADO';
    }

    getEmpresa(usuario?: any): any {
        if (!usuario) usuario = this.getUsuarioLogado();
        let empresa;
        if (usuario.is_fornecedor) empresa = this.getFornecedor();
        else if (usuario.is_oficina) empresa = this.getOficina();
        return empresa;
    }

    procedimentoLogin(token, usuario) {
        this.setToken(token);
        this.setUsuario(usuario);
        if (this.isAdmin() || this.isSuporte())
            this.loginAdmin();
        else if (usuario.is_fornecedor) {
            this.setEmpresa(usuario.id_fornecedor)
            this.loginFornecedor(usuario);
        } else if (usuario.is_oficina) {
            this.setEmpresa(usuario.id_oficina)
            this.loginOficina();
        }
    }

    startCounter() {
        if (this._timerSubscription)
            this._timerSubscription.unsubscribe();

        if (this._exp.getValue() && this._iat.getValue() &&
            !this.utils.isExpired(this._exp.getValue(), this._iat.getValue())) {

            this._counter = this.utils.getSecondsToExpire(this._exp.getValue());
            this._timer = timer(1000, 1000);
            this._timerSubscription = this._timer.subscribe(_v => {
                // Counter monitor
                // console.log('this._counter', this._counter)
                this._counter--;

                // if (this._counter == 30) {
                //     this.swal.show('question', 'A sessão irá expirar em 30 segundos.', 'Deseja renovar?').then(_v => { });
                // } else
                if (this._counter <= 0) {
                    this._timerSubscription.unsubscribe();
                    this.verificarAcessoComTelaBloqueio();
                }
            });
        }
    }
}
