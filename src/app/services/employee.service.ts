import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Employee,
  EmployeeRequest,
  EmployeeResult,
} from '../interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'https://localhost:7062/api';
  constructor(private http: HttpClient) {}

  getEmployees(request: EmployeeRequest): Observable<EmployeeResult> {
    const { first, rows, filter } = request;
    const page = first / rows + 1;
    let urlParams = `pageIndex=${page}&pageSize=${rows}`;

    if (filter && filter.name) {
      urlParams += `&name=${filter.name}`;
    }
    if (filter && filter.email) {
      urlParams += `&email=${filter.email}`;
    }
    if (filter && filter.id) {
      urlParams += `&id=${filter.id}`;
    }
    return this.http.get<EmployeeResult>(
      `${this.baseUrl}/Employee?${urlParams}`
    );
  }

  add(emp: any): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl + '/Employee', emp);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/Employee/' + id);
  }

  update(id:number,emp:any){
    return this.http.put<Employee>(this.baseUrl + '/Employee/' + id , emp);
  }
}
