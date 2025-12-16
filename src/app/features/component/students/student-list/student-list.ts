import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../core/models/student';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../../core/services/student-service';
import { NgFor } from '@angular/common';
import { StudentForm } from '../../../students/student-form/student-form';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-list',
  imports: [RouterModule, NgFor, StudentForm],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss',
})
export class StudentList implements OnInit {
  showForm = false;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'birthYear', 'actions'];
  dataSource: Student[] = [];
  isLoading = true;

  constructor(private studentService: StudentService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.dataSource = this.studentService.getStudents();
    this.isLoading = false;
  }

  openStudentForm(student?: Student): void {
    const dialogRef = this.dialog.open(StudentForm, {
      width: '700px',
      maxHeight: '90vh',
      data: student
    });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      if (student) {
        this.studentService.updateStudent(result);
        this.snackBar.open('Student updated successfully!', 'Close', {
          duration: 3000
        });
      } else {
        this.studentService.addStudent(result);
        this.snackBar.open('Student added successfully!', 'Close', {
          duration: 3000
        });
      }
      this.loadStudents();
    }
  });
    
  }

}
