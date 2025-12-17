import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-form',
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatButton, MatLabel, MatError],
  templateUrl: './student-form.html',
  styleUrl: './student-form.scss',
})
export class StudentForm {
  private fb = inject(FormBuilder);
  private dialogRef= inject(MatDialogRef<StudentForm>);
  private data = inject(MAT_DIALOG_DATA);
  private snackBar = inject(MatSnackBar);

  studentForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthYear: ['', [Validators.required, Validators.min(1900), Validators.max(2025)]],
    email: [''],
    address: [''],
    city: ['']
  });
  
  isEditMode = false;
  dialogTitle = 'Add New Student';

  onSubmit(): void{
    if (this.studentForm.valid) {
      const formValue = this.studentForm.value;
      const newStudent = {
        id: this.isEditMode ? this.data.id : 0,
        firstName: formValue.firstName!,
        lastName: formValue.lastName!,
        birthYear: Number(formValue.birthYear),
        email: formValue.email,
        address: formValue.address || '',
        city: formValue.city || ''
      };
      
      console.log('New student:', newStudent);
      this.dialogRef.close(newStudent);
    }
    else{
      this.showFormErrors();
    }
  }

  private showFormErrors(): void {
    const errorFields = [];
    
    if (this.studentForm.get('firstName')?.hasError('required')) {
      errorFields.push('First Name');
    }
    if (this.studentForm.get('lastName')?.hasError('required')) {
      errorFields.push('Last Name');
    }
    if (this.studentForm.get('birthYear')?.invalid) {
      errorFields.push('Birth Year');
    }
    
    const errorMessage = errorFields.length > 0 
      ? `Please fill in: ${errorFields.join(', ')}`
      : 'Please fill all required fields correctly!';
    
    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
    
    Object.keys(this.studentForm.controls).forEach(key => {
      const control = this.studentForm.get(key);
      control?.markAsTouched();
    });
  }

  constructor() {
    if (this.data) {
      this.isEditMode = true;
      this.studentForm.patchValue({
        ...this.data,
        id: this.data.id,
        birthYear: this.data.birthYear.toString()
      });
    }
  }
}
