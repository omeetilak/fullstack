package com.youtube.crud.controller;

import com.youtube.crud.entity.Employee;
import com.youtube.crud.exception.ValidationError;
import com.youtube.crud.exception.ValidationException;
import com.youtube.crud.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:8100")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/save/employee")
    public Employee saveEmployee(@RequestBody Employee employee) {
        validateEmployee(employee);
        return employeeService.saveEmployee(employee);
    }

    @GetMapping("/get/employee")
    public List<Employee> getEmployees() {
        return employeeService.getEmployees();
    }

    @GetMapping("/get/employee/{employeeId}")
    public Employee getEmployee(@PathVariable Integer employeeId) {
        return employeeService.getEmployees(employeeId);
    }

    @DeleteMapping("/delete/employee/{employeeId}")
    public void deleteEmployee(@PathVariable Integer employeeId) {
        employeeService.deleteEmployee(employeeId);
    }

    @PutMapping("/update/employee")
    public Employee updateEmployee(@RequestBody Employee employee) {
        validateEmployee(employee);
        return employeeService.updateEmployee(employee);
    }

    private void validateEmployee(Employee emp) {
        List<ValidationError> errors = new ArrayList<>();

        if (emp.getEmployeeName() == null || emp.getEmployeeName().trim().isEmpty()) {
            errors.add(new ValidationError("employeeName", "Name must not be empty"));
        }

        if (emp.getEmployeeContactNumber() == null || !emp.getEmployeeContactNumber().matches("\\d{10}")) {
            errors.add(new ValidationError("employeeContactNumber", "Contact number must be 10 digits"));
        }

        if (emp.getEmployeeAddress() == null || emp.getEmployeeAddress().trim().isEmpty()) {
            errors.add(new ValidationError("employeeAddress", "Address must not be empty"));
        }

        if (emp.getEmployeeGender() == null || (!emp.getEmployeeGender().equals("M") && !emp.getEmployeeGender().equals("F"))) {
            errors.add(new ValidationError("employeeGender", "Gender must be M or F"));
        }

        if (emp.getEmployeeDepartment() == null || emp.getEmployeeDepartment().trim().isEmpty()) {
            errors.add(new ValidationError("employeeDepartment", "Department must not be empty"));
        }

        if (emp.getEmployeeSkills() == null || emp.getEmployeeSkills().trim().isEmpty()) {
            errors.add(new ValidationError("employeeSkills", "At least one skill must be selected"));
        }

        if (!errors.isEmpty()) {
            throw new ValidationException(errors);
        }
    }
}
