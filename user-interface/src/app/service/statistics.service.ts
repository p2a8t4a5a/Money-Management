import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {DataPoint} from "../domain/DataPoint";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StatisticsService {
    private currentAccountStatistics = 'api/statistics/current';

    constructor(private http: HttpClient, private authService: AuthenticationService) {
    }


    public getCurrentAccountStatistics(): Observable<DataPoint[]> {
        let token = this.authService.getOauthToken();

        let headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
        let options = {
            headers: headers
        };

        return this.http.get<DataPoint[]>(this.currentAccountStatistics, options);
    }

}
