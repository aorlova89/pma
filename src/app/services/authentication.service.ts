import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { UserPayload } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentTokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;

  private REST_API_SERVER = "https://salty-earth-19583.herokuapp.com";

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token'));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  get currentUserLogin(): string {
    return this.parseToken().login;
  }

  get currentUserId(): string {
    return this.parseToken().userId;
  }

  login(login: string, password: string): Observable<object> {
    return this.http.post<UserPayload>(`${this.REST_API_SERVER}/signin`, { login, password })
      .pipe(map(resp => {
        if (resp.token != null) {
          localStorage.setItem('token', resp.token);
          this.currentTokenSubject.next(resp.token);
        }

        return resp;
      }));
  }

  logout() {
    localStorage.removeItem('token');
    // @ts-ignore
    this.currentTokenSubject.next(null);
  }

  private parseToken = () => {
    const base64Url = this.currentTokenSubject.value.split('.')[1];
    const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
    // @ts-ignore
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };


}
