import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

import {Board, BoardPayload} from "../models/board.model";
import {Column, ColumnPayload} from "../models/column.model";
import {SignUp} from "../models/signup.model";
import {Task, TaskPayload} from "../models/task.model";
import {UserPayload} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private REST_API_SERVER = "https://salty-earth-19583.herokuapp.com";

  constructor(private httpClient: HttpClient) { }

  public signUp(signUpData: SignUp): Observable<UserPayload> {
    return this.httpClient.post<UserPayload>(`${this.REST_API_SERVER}/signup`,
      signUpData,
      { headers: new HttpHeaders({'Content-Type': 'application/json'})}
    );
  }

  //user endpoints
  public getUsers() {
    return this.httpClient.get(`${this.REST_API_SERVER}/users`);
  }

  public updateUser(userId: string, user: UserPayload): Observable<UserPayload> {
    return this.httpClient.put<UserPayload>(`${this.REST_API_SERVER}/users/${userId}`, user);
  }

  public deleteUser(userId: string): Observable<any> {
    return this.httpClient.delete(`${this.REST_API_SERVER}/users/${userId}`);
  }

  //boards endpoints
  public getBoards(): Observable<Board[]> {
    return this.httpClient.get<Board[]>(`${this.REST_API_SERVER}/boards`);
  }

  public getBoardById(boardId: string): Observable<Board> {
    return this.httpClient.get<Board>(`${this.REST_API_SERVER}/boards/${boardId}`);
  }

  public createBoard(boardData: BoardPayload): Observable<Board> {
    return this.httpClient.post<Board>(`${this.REST_API_SERVER}/boards`, boardData);
  }

  public editBoard(boardId: string, data: object, token: string): Observable<Board> {
    return this.httpClient.put<Board>(`${this.REST_API_SERVER}/boards/${boardId}`, data);
  }

  public deleteBoard(boardId: string): Observable<Object> {
    return this.httpClient.delete(`${this.REST_API_SERVER}/boards/${boardId}`);
  }

  //columns endpoints
  public getColumns(boardId: string): Observable<Column[]> {
    return this.httpClient.get<Column[]>(`${this.REST_API_SERVER}/boards/${boardId}/columns`);
  }

  // public getColumnDetails(boardId: string, columnId: string): Observable<ColumnDetails> {
  //   return this.httpClient.get<ColumnDetails>(`${this.REST_API_SERVER}/boards/${boardId}/columns/${columnId}`);
  // }

  public createColumn(boardId: string, columnData: ColumnPayload): Observable<Column> {
    return this.httpClient.post<Column>(`${this.REST_API_SERVER}/boards/${boardId}/columns`, columnData);
  }

  public editColumn(boardId: string, columnId: string, columnData: ColumnPayload): Observable<Column> {
    return this.httpClient.put<Column>(`${this.REST_API_SERVER}/boards/${boardId}/columns/${columnId}`, columnData);
  }

  public deleteColumn(boardId: string, columnId: string): Observable<object> {
    return this.httpClient.delete(`${this.REST_API_SERVER}/boards/${boardId}/columns/${columnId}`);
  }

  //tasks endpoints
  public getTasks(boardId: string, columnId: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.REST_API_SERVER}/boards/${boardId}/columns/${columnId}/tasks`);
  }

  public addTask(boardId: string, columnId: string, taskData: TaskPayload): Observable<Task> {
    return this.httpClient.post<Task>(`${this.REST_API_SERVER}/boards/${boardId}/columns/${columnId}/tasks`, taskData);
  }

  public editTask(boardId: string, columnId: string, taskId: string, taskData: TaskPayload): Observable<Task> {
    return this.httpClient.put<Task>(`${this.REST_API_SERVER}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      taskData);
  }

  public deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

}
