import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SwalService } from './swal.service';
import { UtilsService } from './utils.service';

interface DecodedToken {
    user_id: string,
    user_type: string,
    account_id: string,
    iat?: number,
    exp?: number,
}

interface ILogin {
    email: string;
    password: string;
}

interface IRegister {
    type: string;
    email: string;
    name: string;
    password: string;
    password_confirm: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private readonly API = environment.API;

    public user = new BehaviorSubject<any>({});
    public _user = this.user.asObservable();
    public account = new BehaviorSubject<any>({});
    public _account = this.account.asObservable();

    private _iat = new BehaviorSubject<number>(0);
    private _exp = new BehaviorSubject<number>(0);
    public iat = this._iat.asObservable();
    public exp = this._exp.asObservable();

    public _counter: number = 0;
    private _timer!: Observable<number>;
    private _timerSubscription!: Subscription;

    constructor(
        private http: HttpClient,
        private jwtService: JwtHelperService,
        private utils: UtilsService,
        private router: Router,
        private swal: SwalService
    ) {
        this.refreshExpireSession();
    }

    public login(data: ILogin): Observable<any> {
        return this.http.post(`${this.API}login`, data);
    }

    public register(data: IRegister): Observable<any> {
        return this.http.post(`${this.API}register`, data);
    }

    public logout() {
        this.resetToken();
        window.sessionStorage.clear();
        this.router.navigate(['/auth/login']);
    }

    public setUser(user: any) {
        this.user.next(user);
    }

    public setAccount(account: any) {
        this.account.next(account);
    }

    public setIat(iat: number) {
        this._iat.next(iat);
    }

    public setExp(exp: number) {
        this._exp.next(exp);
    }

    public isUserAdmin(): boolean {
        let token = <DecodedToken>this.getDecodedToken();
        return token.user_type == 'ADMIN';
    }

    public isUserTypeA(): boolean {
        let token = <DecodedToken>this.getDecodedToken();
        return token.user_type == 'TYPE_A';
    }

    public isUserTypeB(): boolean {
        let token = <DecodedToken>this.getDecodedToken();
        return token.user_type == 'TYPE_B';
    }

    public getExpIat(): { iat?: number, exp?: number } | null {
        const decoded_token = this.getDecodedToken();
        try {
            const iat: number | undefined = decoded_token ? decoded_token?.iat : 0;
            const exp: number | undefined = decoded_token ? decoded_token?.exp : 0;
            return { iat: iat, exp: exp };
        } catch (e) {
            return null;
        }
    }

    public getLoggedIdUser(): string | null {
        const decoded_token = <DecodedToken>this.getDecodedToken();
        return decoded_token?.user_id;
    }

    public getLoggedUserIdAccount(): string | null {
        const decoded_token = <DecodedToken>this.getDecodedToken();
        return decoded_token?.account_id;
    }

    public setToken(token: string) {
        if (!token)
            window.sessionStorage.removeItem('token');
        else {
            window.sessionStorage.setItem('token', token);

            this.setUser(this.getLoggedIdUser());
            this.setAccount(this.getLoggedUserIdAccount);
            this.refreshExpireSession();
        }
    }

    public resetToken(): void {
        if (this.getToken()) window.sessionStorage.removeItem('token');
    }

    private refreshExpireSession() {
        console.log('refreshExpireSession')
        const exp_iat = this.getExpIat();
        if (exp_iat) {
            this.setExp(<number>exp_iat.exp);
            this.setIat(<number>exp_iat.iat);
            this.startCounter();
        }
    }

    public getToken(): string | null {
        try {
            return window.sessionStorage.getItem('token');
        } catch (e) {
            return null;
        }
    }

    public getDecodedToken(): DecodedToken | void {
        let token!: string | null;
        try {
            token = this.getToken();
            if (!token) throw new Error('Authentication failure: Token not found.');
            return <DecodedToken>this.jwtService.decodeToken(<string>token);
        } catch (e) {
            if (token) console.warn('Authentication failure: Token not found.');
            else console.error('The token could not be decoded:', e);
        }
    }

    /**
     * 1: Not Authenticated - Token not found.
     * 2: Not Authenticated - Expired token.
     * 3: Authenticated with a token valid.
     */
    public verifyAuthentication(): number {
        const token = this.getToken();

        if (token && !this.jwtService.isTokenExpired(token))
            return 3;
        else if (token && this.jwtService.isTokenExpired(token))
            return 2;
        else return 1;
    }

    public verifyAccessWithLockscreen(): boolean {
        if (this.verifyAuthentication() == 3) { // Autenticado com token válido
            return true;
        } else if (this.verifyAuthentication() == 2) {	// Autenticado com token expirado
            this.router.navigate(['/auth/bloqueio']);
            return false;
        } else if (this.verifyAuthentication() == 1) {	// Não autenticado
            this.router.navigate(['/auth/login']);
            return false;
        } else return false;
    }

    public isTokenExpired(): boolean {
        try {
            const token = this.getToken();
            return this.jwtService.isTokenExpired(<string>token);
        } catch (e) {
            return true;
        }
    }

    private startCounter() {
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

                // if (this._counter == 180) {
                // this.swal.show('question', 'Your session will expire in 3 minutes.', 'Do you want to renew?').then(_v => { });
                // } else
                if (this._counter <= 0) {
                    this._timerSubscription.unsubscribe();
                    this.verifyAccessWithLockscreen();
                }
            });
        }
    }
}
