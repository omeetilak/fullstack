import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService, Employee } from '../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './employee-form.page.html',
  styleUrls: ['./employee-form.page.scss']
})
export class EmployeeFormPage {
  employee: Employee = {
    name: '',
    contact: '',
    address: '',
    department: '',
    gender: '',
    skills: []
  };

  allSkills = ['Java', 'Angular', 'Spring Boot', 'AWS'];
  editing = false;
  errorMessage: string | null = null;

  constructor(private empService: EmployeeService, private router: Router) {}

  ionViewWillEnter() {
    const stored = localStorage.getItem('editEmployee');
    if (stored) {
      this.employee = JSON.parse(stored);
      this.editing = true;
      localStorage.removeItem('editEmployee');
    } else {
      this.clear();
    }
    this.errorMessage = null;
  }

  toggleSkill(skill: string) {
    const i = this.employee.skills.indexOf(skill);
    i >= 0 ? this.employee.skills.splice(i, 1) : this.employee.skills.push(skill);
  }

  validateForm(): boolean {
    if (!this.employee.name || !this.employee.contact || !this.employee.address || 
        !this.employee.department || !this.employee.gender) {
      this.errorMessage = 'All fields are required.';
      return false;
    }
    return true;
  }

  save() {
    this.errorMessage = null;

    if (!this.validateForm()) return;

    const payload = {
      employeeId: this.employee.id,
      employeeName: this.employee.name,
      employeeContactNumber: this.employee.contact,
      employeeAddress: this.employee.address,
      employeeDepartment: this.employee.department,
      employeeGender: this.employee.gender,
      employeeSkills: this.employee.skills.join(',')
    };

    const request = this.editing
      ? this.empService.update(payload)
      : this.empService.create(payload);

    request.subscribe({
      next: () => {
        alert(this.editing ? 'Updated successfully!' : 'Saved successfully!');
        this.clear();
        this.router.navigate(['/employee-list']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'An unexpected error occurred.';
      }
    });
  }

  clear() {
    this.employee = {
      name: '',
      contact: '',
      address: '',
      department: '',
      gender: '',
      skills: []
    };
    this.editing = false;
    this.errorMessage = null;
  }
}
