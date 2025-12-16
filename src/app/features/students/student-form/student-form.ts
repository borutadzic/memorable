import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
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

  studentForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthYear: ['', [Validators.required, Validators.min(1900), Validators.max(2025)]],
    email: [''],
    address: [''],
    city: ['']
  });
  
  onSubmit(): void{
    if(this.studentForm.valid){
      console.log('Form submitted:', this.studentForm.value);
    }
  }
}
