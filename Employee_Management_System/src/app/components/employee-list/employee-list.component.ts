import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmployeeData } from '../../models/employee-data';
import { ModalData } from '../../models/modal-data';
import { ApiResponse } from '../../models/api-response';
import { EmployeeService } from '../../services/employee.service';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
import { NotificationService } from '../../services/notification.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  employees: EmployeeData[]=[];

  @ViewChild(EditEmployeeDialogComponent) employeeEditor?: EditEmployeeDialogComponent;
  @ViewChild(ConfirmationDialogComponent) confirmation?: ConfirmationDialogComponent;

  
  constructor(private employeeService: EmployeeService,
    private notification: NotificationService,
    private elementRef: ElementRef
  )
  {
    
  }
  ngOnInit() {
    this.getEmployees();
    console.log(this.employees)
  }
  
  private getEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data: ApiResponse) => {
        this.employees = data.result;
      }
    });
  }
  
  addEmployee() {
    const data: ModalData = {
      title: "Create Employee"
    };
  
    const subscription = this.employeeEditor?.open(data.title).subscribe({
      next: (form: any) => {
        if (form && form.formData) {
          form.formData.id = "69763f3e-8099-4136-9e0d-917f83d748a8"; 

          this.employeeService.addEmployee(form.formData).subscribe({
            next: (response: ApiResponse) => {
              if (response.isSuccess && response.result) {
                if (Array.isArray(response.result)) {
                  this.employees.push(...(response.result as EmployeeData[]));
                } else {
                  this.employees.push(response.result as EmployeeData);
                }
                this.notification.success("Employee added successfully");
              } else {
                this.notification.error(response.message || "Error adding employee");
              }
            },
            error: (error) => {
              this.notification.error("An error occurred while adding the employee.");
            }
          });
  
          subscription?.unsubscribe();
        }
      },
      error: () => {
        this.notification.error("Employee creation was canceled.");
      }
    });
  }
  
  editEmployee(employee: EmployeeData) {
    const subscription = this.employeeEditor?.open("Update Employee", employee).subscribe({
      next: (form: any) => {
        form.formData.id = employee.id;
        this.employeeService.updateEmployee(form.formData).subscribe({
          next: (response: ApiResponse) => {
            if (response.isSuccess) {
              this.notification.success("Contact updated successfully");
              const index = this.employees.findIndex(c => c.id === employee.id);
              this.employees.splice(index, 1, response.result as unknown as EmployeeData);
            }
          }
        });
        subscription?.unsubscribe();
      }
    });
  }

  deleteEmployee(employeeId: string) {
    const data: ModalData = {
      title: "Confirmation",
      content: "Are you sure, you want to delete this Employee?",
    };
  
    const subscription = this.confirmation?.open(data).subscribe({
      next: (yes: boolean) => {
        if (yes) {
          this.employeeService.deleteEmployee(employeeId).subscribe({
            next: (response: ApiResponse) => {
              if (response.isSuccess) {
                this.notification.success("Employee deleted successfully");
                const index = this.employees.findIndex(e => e.id === employeeId);
                if (index > -1) {
                  this.employees.splice(index, 1);
                }
              }
            }
          });
        }
        subscription?.unsubscribe();
      }
    });
  }
  
}
