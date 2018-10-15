import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {Account} from "../domain/Account";

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private getCurrentAccountUrl = 'api/accounts/current';

    constructor(private http: HttpClient, private authService: AuthenticationService) {
    }

    public getCurrentAccount(): Observable<Account> {
        let account = AccountService.getCurrentAccountFromSession();

        if (account == null) {
            return this.requestServer();
        }

        return new Observable(obs => {
            obs.next(account);
        })
    }


    private static getCurrentAccountFromSession(): Account {
        return JSON.parse(localStorage.getItem('account'))
    }


    private requestServer(): Observable<Account> {
        var observable = this.createRequest();
        observable.subscribe(result => AccountService.saveAccount(result));
        return observable;
    }

    private createRequest(): Observable<Account> {
        let token = this.authService.getOauthToken();

        let headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
        let options = {
            headers: headers
        };

        return this.http.get<Account>(this.getCurrentAccountUrl, options);
    }

    private static saveAccount(account: Account) {
        localStorage.setItem('account', JSON.stringify(account));
    }

}
