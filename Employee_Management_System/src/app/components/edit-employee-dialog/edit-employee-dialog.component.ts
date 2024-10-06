import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

// const $ = (window as any)["$"];

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.css']
})
export class EditEmployeeDialogComponent {
  employeeForm!: FormGroup;
  submitted = false;

  @ViewChild("modal") modal?: ElementRef;
    data?: any;
  @Output() onAction = new EventEmitter<any>(); 
  
  constructor(private fb: FormBuilder, private renderer: Renderer2) {
    this.initializeForm();
  }
  get f() {
    return this.employeeForm?.controls;
  }
  initializeForm() {
    this.employeeForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      salary: ["", Validators.required],
      department: ["", Validators.required]
    });
  }

  open(title: string, data?: any): Observable<any> {
    this.data = { title: title };
    this.submitted = false;
    
    if (data) {
      this.employeeForm.patchValue(data);
    } else {
      this.employeeForm.reset();
    }

    this.renderer.addClass(this.modal?.nativeElement, 'show');
    this.renderer.setStyle(this.modal?.nativeElement, 'display', 'block');
    this.renderer.setAttribute(this.modal?.nativeElement, 'aria-hidden', 'false');

    return this.onAction.asObservable();
  }

  closeDialog() {
    this.renderer.removeClass(this.modal?.nativeElement, 'show');
    this.renderer.setStyle(this.modal?.nativeElement, 'display', 'none');
    this.renderer.setAttribute(this.modal?.nativeElement, 'aria-hidden', 'true');
  }

  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.valid) {
      this.onAction.next({ formData: this.employeeForm.value });
      this.closeDialog();
      this.employeeForm.reset();
    }
  }

  onCancel(): void {
    this.onAction.next(null);
    this.closeDialog();
  }
}

