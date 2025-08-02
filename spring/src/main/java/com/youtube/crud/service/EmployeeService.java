package com.youtube.crud.service;

import com.youtube.crud.dao.EmployeeDao;
import com.youtube.crud.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeDao employeeDao;

    // Assigns ID manually to maintain sequence
    public Employee saveEmployee(Employee employee) {
        List<Employee> all = employeeDao.findAll(Sort.by("employeeId"));
        int nextId = all.isEmpty() ? 1 : all.get(all.size() - 1).getEmployeeId() + 1;
        employee.setEmployeeId(nextId);
        return employeeDao.save(employee);
    }

    public List<Employee> getEmployees() {
        List<Employee> employees = new ArrayList<>();
        employeeDao.findAll(Sort.by("employeeId")).forEach(employees::add);
        return employees;
    }

    public Employee getEmployees(Integer employeeId) {
        return employeeDao.findById(employeeId).orElseThrow();
    }

    public void deleteEmployee(Integer employeeId) {
        employeeDao.deleteById(employeeId);

        // Fetch remaining sorted employees and reassign IDs
        List<Employee> remaining = employeeDao.findAll(Sort.by("employeeId"));
        for (int i = 0; i < remaining.size(); i++) {
            remaining.get(i).setEmployeeId(i + 1);
        }
        employeeDao.saveAll(remaining);
    }

    public Employee updateEmployee(Employee employee) {
        employeeDao.findById(employee.getEmployeeId()).orElseThrow();
        return employeeDao.save(employee);
    }
}
