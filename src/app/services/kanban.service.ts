import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Board, BoardPayload} from "../models/board.model";
import {Column, ColumnPayload} from "../models/column.model";
import {SignUp} from "../models/signup.model";
import {LocalStorageService} from "./local-storage.service";
import {Task, TaskPayload} from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private REST_API_SERVER = "https://salty-earth-19583.herokuapp.com";

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  token = this.localStorageService.getTokenValue();

  signInHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  requestOptions = { headers: this.signInHeaders };

  private buildRequestHeaders(token: any): Object {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return { headers: headers};
  }

  // auth
  public signIn(login: string, password: string): Observable<Object> {
    return this.httpClient.post<Object>(`${this.REST_API_SERVER}/signin`,
      {login: login, password: password},
      this.requestOptions);
  }

  public signUp(signUpData: SignUp): Observable<object> {
    return this.httpClient.post<Object>(`${this.REST_API_SERVER}/signup`,
      signUpData,
      this.requestOptions);
  }

  public getUsers() {
    return this.httpClient.get(`${this.REST_API_SERVER}/users`,
      this.buildRequestHeaders(this.token));
  }

  //boards
  public getBoards(): Observable<Board[]> {
    return this.httpClient.get<Board[]>(`${this.REST_API_SERVER}/boards`,
      this.buildRequestHeaders(this.token));
  }

  public createBoard(boardData: BoardPayload): Observable<Board> {
    return this.httpClient.post<Board>(`${this.REST_API_SERVER}/boards`,
      boardData,
      this.buildRequestHeaders(this.token));
  }

  public editBoard(boardId: string, data: object, token: string): Observable<Board> {
    return this.httpClient.put<Board>(`${this.REST_API_SERVER}/boards/${boardId}`,
      data,
      this.buildRequestHeaders(token));
  }

  public deleteBoard(boardId: string): Observable<Object> {
    return this.httpClient.delete(`${this.REST_API_SERVER}/boards/${boardId}`,
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.token}` })}
    );
  }

  //columns
  public getColumns(boardId: string): Observable<Column[]> {
    return this.httpClient.get<Column[]>(`${this.REST_API_SERVER}/boards/${boardId}/columns`,
      this.buildRequestHeaders(this.token));
  }

  public createColumn(boardId: string, columnData: ColumnPayload): Observable<Column> {
    return this.httpClient.post<Column>(`${this.REST_API_SERVER}/boards/${boardId}/columns`,
      columnData,
      this.buildRequestHeaders(this.token));
  }

  public editColumn(boardId: string, columnId: string, columnData: Column, token: string): Observable<object> {
    return this.httpClient.put(`${this.REST_API_SERVER}/boards/${boardId}/columns/${columnId}`,
      columnData,
      this.buildRequestHeaders(token));
  }

  public deleteColumn(boardId: string, columnId: string): Observable<object> {
    return this.httpClient.delete(`${this.REST_API_SERVER}/boards/${boardId}/columns/${columnId}`,
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.token}` })}
    );
  }

  //tasks
  public getTasks(boardId: string, columnId: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.REST_API_SERVER}/boards/${boardId}/columns/${columnId}/tasks`,
      this.buildRequestHeaders(this.token));
  }

  public addTask(boardId: string, columnId: string, taskData: TaskPayload): Observable<Task> {
    return this.httpClient.post<Task>(`${this.REST_API_SERVER}/boards/${boardId}/columns/${columnId}/tasks`,
      taskData,
      this.buildRequestHeaders(this.token));
  }

  public editTask(boardId: string, columnId: string, taskId: string, taskData: TaskPayload): Observable<Task> {
    return this.httpClient.put<Task>(`${this.REST_API_SERVER}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      taskData,
      this.buildRequestHeaders(this.token));
  }

  public deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.token}` })});
  }

}
