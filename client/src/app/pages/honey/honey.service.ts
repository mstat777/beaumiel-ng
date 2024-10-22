import { Injectable } from '@angular/core';
import { Honey, Packaging } from '../../models/types';
import { HttpClient } from '@angular/common/http';
import { TranslocoService } from '@jsverse/transloco';
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

    getHoneysData(): Observable<Honey[]> {
        const lang = this.translocoService.getActiveLang();
        let URL = `${this.baseURL}/honey/main/${lang}`;
        return this.http.get<Honey[]>(URL)
            .pipe(
                catchError(this.handleError<Honey[]>('getHoneysData', []))
            ); 
    }

    getPackagingsData(honeyId: number): Observable<Packaging[]> {
        const lang = this.translocoService.getActiveLang();
        let URL = `${this.baseURL}/honey/packagings/${honeyId}`;
        return this.http.get<Packaging[]>(URL)
            .pipe(
                catchError(this.handleError<Packaging[]>('getPackagingsData', []))
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