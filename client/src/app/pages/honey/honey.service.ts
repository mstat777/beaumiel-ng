import { Injectable } from '@angular/core';
import { Honey } from '../../models/honey';
import { HttpClient } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HoneyService {
    baseURL = import.meta.env.NG_APP_BASE_URL;

    constructor(
        private http: HttpClient,
        private translocoService: TranslocoService
    ) {}

    getApiData(): Observable<Honey[]> {
        const lang = this.translocoService.getActiveLang();
        let URL = `${this.baseURL}/honeys/${lang}`;
        return this.http.get<Honey[]>(URL)
            .pipe(
                catchError(this.handleError<Honey[]>('getApiData', []))
            ); 
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
        
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}