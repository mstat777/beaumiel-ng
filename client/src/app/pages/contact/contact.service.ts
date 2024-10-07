import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
    private api="https://formspree.io/f/xanwgdwq";

    constructor(private http: HttpClient) { }

    postMessage(input: any) {
        return this.http.post(this.api, input, { responseType: 'text'}).pipe(
            map(
                (res) => {
                    if (res) return res
                    else return undefined;
                },
                (err: any) => {
                    return err;
                }
            )
        )
    };
}