import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private getCurrentAccountUrl = 'api/account/current';

    constructor(private http: HttpClient, private authService: AuthenticationService) {
    }

    public getCurrentAccount(): Observable<Account> {
        let token = this.authService.getOauthToken();

        let headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
        let options = {
            headers: headers
        };


        return this.http.get<Account>(this.getCurrentAccountUrl, options);
    }

}
