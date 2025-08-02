import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { EmployeeService, Employee } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './employee-list.page.html',
  styleUrls: ['./employee-list.page.scss']
})
export class EmployeeListPage implements OnInit {
  employees: Employee[] = [];

  constructor(private empService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getAll().subscribe(
      (data) => {
        this.employees = data.map((e: any) => ({
          id: e.employeeId,
          name: e.employeeName,
          contact: e.employeeContactNumber,
          address: e.employeeAddress,
          department: e.employeeDepartment,
          gender: e.employeeGender,
          skills: e.employeeSkills ? e.employeeSkills.split(',').map((s: string) => s.trim()) : []
        }));
        console.log('Employees loaded:', this.employees);
      },
      (error) => {
        console.error('Error loading employees:', error);
      }
    );
  }

  edit(emp: any) {
    const transformedEmp: Employee = {
      id: emp.id,
      name: emp.name,
      contact: emp.contact,
      address: emp.address,
      department: emp.department,
      gender: emp.gender,
      skills: emp.skills
    };
    localStorage.setItem('editEmployee', JSON.stringify(transformedEmp));
    this.router.navigate(['/employee-form']);
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.empService.delete(id).subscribe(() => this.loadEmployees());
    }
  }

  goToForm() {
    this.router.navigate(['/employee-form']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
