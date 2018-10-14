import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private static account: Account;

    private getCurrentAccountUrl = 'api/accounts/current';

    constructor(private http: HttpClient, private authService: AuthenticationService) {
    }

    public getCurrentAccount(): Observable<Account> {
        if (!AccountService.account) {
            return this.requestServer();
        }

        return new Observable(obs => {
            obs.next(AccountService.account);
        })
    }


    private requestServer(): Observable<Account> {
        var observable = this.createRequest();

        observable.subscribe(result => {
            AccountService.account = result;
        });

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

}
