import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userApi = 'http://localhost:8181/users';
  private mapApi = 'http://localhost:1010/code';



  constructor(private http: HttpClient) { }

  createUser(userData: any): Observable<any> {
    return this.http.post(this.userApi, userData);
  }

  upUser(userData: any): Observable<any> {
    return this.http.put(this.userApi, userData);
  }

  getCitiesByState(state: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.mapApi}/cities/${state}`);
  }

  upAddress(addressData: any): Observable<any> {
    return this.http.put(this.mapApi, addressData);
  }
}