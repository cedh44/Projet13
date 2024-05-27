import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = './assets/mock/users.json';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.usersUrl);
  }
}
