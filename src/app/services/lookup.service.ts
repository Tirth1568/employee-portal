import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lookup } from '../interfaces/lookup';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  private baseUrl = 'https://localhost:7062/api';
  constructor(private http: HttpClient) { }

  getDepartments() : Observable<Lookup[]>{
    return this.http.get<Lookup[]>( this.baseUrl + '/Department')
  }

  getDesignations(): Observable<Lookup[]>{
    return this.http.get<Lookup[]>(this.baseUrl + '/Designation')
  }
  
}
