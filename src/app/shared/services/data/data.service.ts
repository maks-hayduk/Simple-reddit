import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/';
  }

  public getPosts(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.url + 'posts');
  }
  public getUsers(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.url + 'users');
  }
  public addUser(item: any): Observable<Array<any>> {
    return this.http.post<Array<any>>(this.url + 'users', item);
  }
  public addPost(item: any): Observable<Array<any>> {
    return this.http.post<Array<any>>(this.url + 'posts', item);
  }
  public updatePost(item: any): Observable<Array<any>> {
    return this.http.put<Array<any>>(`${this.url + 'posts'}/${item.id}`, item);
  }
  public delPost(id: string): Observable<Array<any>> {
    return this.http.delete<Array<any>>(`${this.url + 'posts'}/${id}`);
  }
}
