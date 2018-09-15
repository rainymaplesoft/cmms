import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';

export class JwtUser {
    id?: number;
    userName: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    passwordConfirm?: string;
    email?: string;
}

export interface IJwtPacket {
    token: string;
    userName: string;
    email: string;
}

@Injectable()
export class JwtAuthService {

    private _token: string;
    private NAME_KEY = '__jwt_name_Key__';
    private EMAIL_KEY = '__jwt_email_Key__';

    constructor(private dataService: HttpService, private storageService: StorageService,
        private router: Router) { }


    get isAutenticated() {
        return !!this.storageService.getItem(this.dataService.TOKEN_KEY);
    }

    get userName() {
        return this.storageService.getItem(this.NAME_KEY);
    }

    get token() {
        return this.storageService.getItem(this.dataService.TOKEN_KEY);
    }

    get tokenHeader() {
        const header = new Headers({ 'Authorization': 'Bearer ' + this.storageService.getItem(this.dataService.TOKEN_KEY) });
        const options: RequestOptionsArgs = { headers: header };
        return options;
    }

    regester(user: JwtUser, urlJwtRegister: string, routeSucceeded: string, routeFailed: string): void {
        delete user.passwordConfirm;
        this.dataService.postData<IJwtPacket>(urlJwtRegister, user)
            .subscribe(c => {
                this.authenticated(c, routeSucceeded, routeFailed);
            },
            (error: any) => {
                this.logout(routeFailed);
            });
    }

    login(urlLogin: string, user: JwtUser, routeSucceeded: string, routeFailed: string): void {
        this.dataService.postData<IJwtPacket>(urlLogin, user)
            .subscribe(c => {
                this.authenticated(c, routeSucceeded, routeFailed);
            },
            (error: any) => {
                this.logout(routeFailed);
            });
    }

    logout(route: string) {
        this.storageService.removeItem(this.dataService.TOKEN_KEY);
        this.storageService.removeItem(this.NAME_KEY);
        this.storageService.removeItem(this.EMAIL_KEY);
        this.router.navigate([route]);
    }

    private authenticated(c: IJwtPacket, routeSucceeded: string, routeFailed: string) {
        if (!c || !c.token) {
            this.logout(routeFailed);
            return;
        }
        this._token = c.token;
        this.storageService.setItem(this.dataService.TOKEN_KEY, this._token);
        this.storageService.setItem(this.NAME_KEY, c.userName);
        this.storageService.setItem(this.EMAIL_KEY, c.email);
        this.router.navigate([routeSucceeded]);
    }

}
