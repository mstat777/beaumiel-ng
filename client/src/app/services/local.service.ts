import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';


@Injectable({
    providedIn: 'root'
})
export class LocalService {

    //key = import.meta.env.NG_APP_SK;
    key='562';

    constructor() { }

    public saveData(key: string, value: string){
        return localStorage.setItem(key, this.encrypt(value));
    }

    public getData(key: string){
        const data = localStorage.getItem(key) || '';
        return this.decrypt(data);
    }

    public removeData(key: string){
        localStorage.removeItem(key);
    }

    public clearData(){
        localStorage.clear();
    }

    private encrypt(txt: string): string {
        return CryptoJS.AES.encrypt(txt, this.key).toString();
    }

    private decrypt(txt: string) {
        return CryptoJS.AES.decrypt(txt, this.key).toString(CryptoJS.enc.Utf8);
    }
}