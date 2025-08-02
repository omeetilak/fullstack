import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Employee {
  id?: number;
  name: string;
  contact: string;
  address: string;
  department: string;
  gender: string;
  skills: string[];
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  // GET all employees
  getAll(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(`${this.apiUrl}/get/employee`)
      .pipe(catchError(this.handleError));
  }

  // POST: Create a new employee
  create(emp: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/save/employee`, emp)
      .pipe(catchError(this.handleError));
  }

  // PUT: Update an existing employee
  update(emp: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/update/employee`, emp)
      .pipe(catchError(this.handleError));
  }

  // DELETE: Delete an employee by ID
  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/delete/employee/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client Error:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(() => error);
  }
}
