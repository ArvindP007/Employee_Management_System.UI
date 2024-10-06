import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { EmployeeData } from '../models/employee-data';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = `${environment.APIBaseUrl}/api/Employee`;
  
  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

  addEmployee(employee: EmployeeData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}`, employee);
  }

  updateEmployee(employee: EmployeeData): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}`, employee);
  }

  deleteEmployee(employeeId: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${employeeId}`);
  }
}
