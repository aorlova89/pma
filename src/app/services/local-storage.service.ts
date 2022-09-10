import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _tokenData = new BehaviorSubject<string>('');
  public tokenData = this._tokenData.asObservable();

  setToken(token: string) {
    localStorage.setItem('token', token);
    this._tokenData.next(token);
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this._tokenData.next(token);
    }
    return this.tokenData;
  }

  getTokenValue() {
    if (localStorage.getItem('token') === null) {
      return 'no token';
    } else {
      return localStorage.getItem('token');
    }

  }

  getLoginValue() {
    return this.parseJwt(this._tokenData.value).login;
  }

  clearToken() {
    localStorage.removeItem('token');
    this._tokenData.next('');
  }

  private parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  constructor() { }
}
