import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-student-form',
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatButton, MatLabel, MatError],
  templateUrl: './student-form.html',
  styleUrl: './student-form.scss',
})
export class StudentForm {
  private fb = inject(FormBuilder);
  private dialogRef= inject(MatDialogRef<StudentForm>);

  studentForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthYear: ['', [Validators.required, Validators.min(1900), Validators.max(2025)]],
    email: [''],
    address: [''],
    city: ['']
  });
  
  onSubmit(): void{
    if (this.studentForm.valid) {
      const formValue = this.studentForm.value;
      const newStudent = {
        id: 0,
        firstName: formValue.firstName!,
        lastName: formValue.lastName!,
        birthYear: Number(formValue.birthYear),
        email: formValue.email!,
        address: formValue.address || '',
        city: formValue.city || ''
      };
      
      console.log('New student:', newStudent);
      this.dialogRef.close(newStudent);
    }
  }
}
