import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getUsers(page?:string, limit?:string) {
    const url = `${this.apiUrl}/user?page=${page}&limit=${limit}`;
    return this.http.get(url, { headers: { 'app-id': this.apiKey } });
  }

  getUser(userId: string) {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get(url, { headers: { 'app-id': this.apiKey } });
  }

  addUser(user: any) {
    const url = `${this.apiUrl}/user/create`;
    return this.http.post(url, user, { headers: { 'app-id': this.apiKey } });
  }

  deleteUser(userId: string) {
    const url = `${environment.apiUrl}/user/${userId}`;
    return this.http.delete(url, { headers: { 'app-id': environment.apiKey } });
  }

  updateUser(userId: string, userData: any) {
    const url = `${environment.apiUrl}/user/${userId}`;
    return this.http.put(url, userData, { headers: { 'app-id': environment.apiKey } });
  }


}
